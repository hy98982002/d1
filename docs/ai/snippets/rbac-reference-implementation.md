> Reference only (non-normative)
> This file demonstrates one possible RBAC implementation pattern.
> Actual business rules are defined elsewhere.

# RBAC 权限系统参考实现

## 1. RBAC 状态管理

```typescript
// store/rbacStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 定义角色和权限类型
export type Role = 'Guest' | 'User' | 'Premium Member' | 'Staff Admin' | 'Super Admin'
export type Permission = 'course.view' | 'course.edit' | 'course.create' | 'user.manage' | 'membership.manage'

interface UserRoles {
  roles: Role[]
  permissions: Permission[]
}

export const useRBACStore = defineStore('rbac', () => {
  // 状态
  const userRoles = ref<Role[]>(['Guest'])
  const permissions = ref<Permission[]>([])
  const isRBACLoading = ref(false)
  const rbacError = ref<string | null>(null)

  // 角色和权限映射
  const rolePermissions: Record<Role, Permission[]> = {
    'Guest': ['course.view'],
    'User': ['course.view', 'user.manage'],
    'Premium Member': ['course.view', 'user.manage', 'membership.manage'],
    'Staff Admin': ['course.view', 'course.edit', 'user.manage', 'membership.manage'],
    'Super Admin': ['course.view', 'course.edit', 'course.create', 'user.manage', 'membership.manage']
  }

  // 计算属性
  const hasRole = computed(() => (role: Role) => {
    return userRoles.value.includes(role)
  })

  const hasPermission = computed(() => (permission: Permission) => {
    return permissions.value.includes(permission)
  })

  // 基于角色的课程访问控制
  const canAccessCourse = computed(() => (courseStage: string) => {
    if (courseStage === 'beginner') return true // 基础课程免费，所有人可访问
    if (courseStage === 'intermediate')
      return hasRole.value('Premium Member') || hasRole.value('Staff Admin') || hasRole.value('Super Admin')
    if (courseStage === 'advanced') return true // 高阶课程可单独购买
    return false
  })

  // 检查用户是否是管理员
  const isAdmin = computed(() => {
    return hasRole.value('Staff Admin') || hasRole.value('Super Admin')
  })

  // Actions
  const fetchUserRoles = async () => {
    isRBACLoading.value = true
    rbacError.value = null
    
    try {
      // 调用 API 获取用户角色
      const response = await api.getUserRoles()
      const roles = response.data.roles as Role[]
      userRoles.value = roles
      
      // 根据角色计算权限
      const allPermissions = new Set<Permission>()
      roles.forEach(role => {
        rolePermissions[role].forEach(permission => {
          allPermissions.add(permission)
        })
      })
      
      permissions.value = Array.from(allPermissions)
    } catch (error) {
      rbacError.value = '获取用户角色失败'
      console.error('获取用户角色失败:', error)
    } finally {
      isRBACLoading.value = false
    }
  }

  // 设置用户角色（用于测试或模拟）
  const setUserRoles = (roles: Role[]) => {
    userRoles.value = roles
    
    // 更新权限
    const allPermissions = new Set<Permission>()
    roles.forEach(role => {
      rolePermissions[role].forEach(permission => {
        allPermissions.add(permission)
      })
    })
    
    permissions.value = Array.from(allPermissions)
  }

  // 重置到默认状态
  const resetRBAC = () => {
    userRoles.value = ['Guest']
    permissions.value = rolePermissions['Guest']
    rbacError.value = null
  }

  return {
    // 状态
    userRoles,
    permissions,
    isRBACLoading,
    rbacError,
    
    // 计算属性
    hasRole,
    hasPermission,
    canAccessCourse,
    isAdmin,
    
    // Actions
    fetchUserRoles,
    setUserRoles,
    resetRBAC
  }
})
```

## 2. RBAC 权限指令

```typescript
// directives/rbac.ts
import { Directive, DirectiveBinding } from 'vue'
import { useRBACStore } from '@/store/rbacStore'

// v-permission 指令：基于权限控制元素显示
export const permissionDirective: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const rbacStore = useRBACStore()
    const permission = binding.value as string
    
    if (!rbacStore.hasPermission(permission)) {
      el.style.display = 'none'
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    const rbacStore = useRBACStore()
    const permission = binding.value as string
    
    if (rbacStore.hasPermission(permission)) {
      el.style.display = ''
    } else {
      el.style.display = 'none'
    }
  }
}

// v-role 指令：基于角色控制元素显示
export const roleDirective: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const rbacStore = useRBACStore()
    const role = binding.value as string
    
    if (!rbacStore.hasRole(role)) {
      el.style.display = 'none'
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    const rbacStore = useRBACStore()
    const role = binding.value as string
    
    if (rbacStore.hasRole(role)) {
      el.style.display = ''
    } else {
      el.style.display = 'none'
    }
  }
}

// 在 main.ts 中注册指令
// app.directive('permission', permissionDirective)
// app.directive('role', roleDirective)
```

## 3. RBAC 权限门组件

```vue
<!-- components/rbac/PermissionGate.vue -->
<template>
  <div>
    <!-- 有权限时显示的内容 -->
    <slot v-if="hasRequiredPermission">
      <!-- 有权限的内容将在这里渲染 -->
    </slot>
    
    <!-- 无权限提示 -->
    <div v-else class="permission-denied" v-if="showDeniedMessage">
      <h3>权限不足</h3>
      <p>您没有权限访问此内容或执行此操作</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRBACStore } from '@/store/rbacStore'

// Props
const props = defineProps<{
  permission?: string
  role?: string
  showDeniedMessage?: boolean
}>()

const rbacStore = useRBACStore()

// 计算是否有必要的权限
const hasRequiredPermission = computed(() => {
  if (props.permission) {
    return rbacStore.hasPermission(props.permission as any)
  }
  
  if (props.role) {
    return rbacStore.hasRole(props.role as any)
  }
  
  // 没有指定权限或角色，默认显示
  return true
})
</script>

<style scoped>
.permission-denied {
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: 8px;
  padding: 20px;
  color: #856404;
  text-align: center;
  margin: 20px 0;
}
</style>
```

## 4. 在组件中使用 RBAC

```vue
<!-- views/CourseManagement.vue - 使用 RBAC 权限控制 -->
<template>
  <div class="course-management">
    <h1>课程管理</h1>
    
    <!-- 只有具有 course.create 权限的用户才能看到创建课程按钮 -->
    <button 
      @click="createCourse" 
      class="btn btn-primary mb-3"
      v-permission="'course.create'"
    >
      创建新课程
    </button>
    
    <!-- 使用 PermissionGate 组件控制整个课程列表的显示 -->
    <PermissionGate permission="course.view" showDeniedMessage>
      <div class="course-list">
        <div 
          v-for="course in courses" 
          :key="course.id" 
          class="course-item"
        >
          <h3>{{ course.name }}</h3>
          <p>{{ course.description }}</p>
          
          <!-- 只有管理员角色才能看到编辑和删除按钮 -->
          <div class="course-actions">
            <button 
              @click="editCourse(course.id)" 
              class="btn btn-secondary me-2"
              v-role="'Staff Admin'"
            >
              编辑
            </button>
            <button 
              @click="deleteCourse(course.id)" 
              class="btn btn-danger"
              v-role="'Super Admin'"
            >
              删除
            </button>
          </div>
        </div>
      </div>
    </PermissionGate>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCourseStore } from '@/store/courseStore'
import { useRBACStore } from '@/store/rbacStore'
import PermissionGate from '@/components/rbac/PermissionGate.vue'

const courseStore = useCourseStore()
const rbacStore = useRBACStore()

const courses = ref(courseStore.courses)

// 页面加载时获取用户角色和权限
onMounted(() => {
  rbacStore.fetchUserRoles()
  courseStore.fetchCourses()
})

// 创建课程
const createCourse = () => {
  // 实现创建课程逻辑
  console.log('创建课程')
}

// 编辑课程
const editCourse = (courseId: number) => {
  // 实现编辑课程逻辑
  console.log('编辑课程:', courseId)
}

// 删除课程
const deleteCourse = (courseId: number) => {
  // 实现删除课程逻辑
  console.log('删除课程:', courseId)
}
</script>
```

## 5. 使用组合式 API 封装 RBAC 逻辑

```typescript
// composables/useRBAC.ts - 简化权限检查
export const useRBAC = () => {
  const rbacStore = useRBACStore()

  // 检查是否有指定角色
  const hasRole = (role: string) => rbacStore.hasRole(role as any)
  
  // 检查是否有指定权限
  const hasPermission = (permission: string) => rbacStore.hasPermission(permission as any)
  
  // 基于课程阶段的访问控制
  const canAccessCourse = (courseStage: string) => {
    return rbacStore.canAccessCourse(courseStage)
  }
  
  // 检查是否是管理员
  const isAdmin = () => {
    return rbacStore.isAdmin
  }

  return { hasRole, hasPermission, canAccessCourse, isAdmin }
}
```

## 6. 在组件中使用封装的 RBAC 组合式 API

```vue
<!-- components/course/CourseCard.vue - 使用封装的 RBAC 组合式 API -->
<template>
  <div class="course-card">
    <img :src="course.coverImage" :alt="course.name" class="course-cover" />
    <h3>{{ course.name }}</h3>
    <p>{{ course.description }}</p>
    
    <div class="course-price">
      <span>价格: ¥{{ course.price }}</span>
    </div>
    
    <!-- 使用封装的 RBAC 组合式 API 检查权限 -->
    <button 
      @click="enrollCourse" 
      class="btn btn-primary"
      :disabled="!canAccess"
    >
      {{ canAccess ? '立即学习' : '需要会员' }}
    </button>
    
    <!-- 只有管理员才能看到编辑按钮 -->
    <button 
      v-if="isAdmin()" 
      @click="editCourse" 
      class="btn btn-secondary"
    >
      编辑
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRBAC } from '@/composables/useRBAC'

// Props
const props = defineProps<{
  course: any
}>()

// 使用封装的 RBAC 组合式 API
const { canAccessCourse, isAdmin } = useRBAC()

// 计算是否可以访问该课程
const canAccess = computed(() => {
  return canAccessCourse(props.course.stage)
})

// 报名课程
const enrollCourse = () => {
  if (canAccess.value) {
    console.log('报名课程:', props.course.id)
  }
}

// 编辑课程
const editCourse = () => {
  console.log('编辑课程:', props.course.id)
}
</script>
```

## 最佳实践

1. **集中管理**：使用 Pinia 集中管理角色和权限状态
2. **多种使用方式**：提供指令、组件和组合式 API 多种方式使用 RBAC
3. **清晰的权限结构**：定义清晰的角色和权限映射关系
4. **默认权限**：为 Guest 角色设置默认权限，确保系统可用性
5. **权限继承**：高级角色继承低级角色的权限
6. **动态更新**：权限变化时自动更新 UI
7. **错误处理**：处理权限加载和获取失败的情况
8. **测试支持**：提供设置角色的方法，便于测试不同角色的行为
9. **安全考虑**：前端 RBAC 仅作为体验优化，后端必须进行最终的权限验证
10. **可扩展性**：设计时考虑未来可能的角色和权限扩展