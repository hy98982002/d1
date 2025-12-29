# 会员系统集成示例

## 1. 会员状态管理

```typescript
// store/membershipStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMembershipStore = defineStore('membership', () => {
  // 会员状态
  const membershipStatus = ref<'none' | 'monthly' | 'yearly'>('none')
  const membershipExpiry = ref<Date | null>(null)
  const isMembershipLoading = ref(false)
  const membershipError = ref<string | null>(null)

  // 计算属性
  const isMember = computed(() => membershipStatus.value !== 'none')
  const isMembershipExpired = computed(() => {
    if (!membershipExpiry.value) return false
    return new Date() > membershipExpiry.value
  })
  const membershipType = computed(() => membershipStatus.value)

  // 会员访问控制逻辑
  const canAccessCourse = computed(() => (courseStage: string) => {
    // 基于三级阶段体系的访问控制
    if (courseStage === 'beginner') return true // 基础课程免费
    if (courseStage === 'intermediate') return isMember.value // 进阶课程需要会员
    if (courseStage === 'advanced') return true // 高阶课程可单独购买，会员享9折
    return false
  })

  // 会员价格计算
  const getMemberPrice = computed(() => (originalPrice: number) => {
    return isMember.value ? originalPrice * 0.9 : originalPrice // 会员享受9折
  })

  // Actions
  const fetchMembershipStatus = async () => {
    isMembershipLoading.value = true
    membershipError.value = null
    
    try {
      // 调用 API 获取会员状态
      const response = await api.getMembershipStatus()
      membershipStatus.value = response.data.status
      membershipExpiry.value = response.data.expiry ? new Date(response.data.expiry) : null
    } catch (error) {
      membershipError.value = '获取会员状态失败'
      console.error('获取会员状态失败:', error)
    } finally {
      isMembershipLoading.value = false
    }
  }

  const subscribeMembership = async (type: 'monthly' | 'yearly') => {
    isMembershipLoading.value = true
    membershipError.value = null
    
    try {
      const response = await api.subscribeMembership(type)
      membershipStatus.value = response.data.status
      membershipExpiry.value = new Date(response.data.expiry)
      return response.data
    } catch (error) {
      membershipError.value = '订阅会员失败'
      console.error('订阅会员失败:', error)
      throw error
    } finally {
      isMembershipLoading.value = false
    }
  }

  const cancelMembership = async () => {
    isMembershipLoading.value = true
    membershipError.value = null
    
    try {
      await api.cancelMembership()
      membershipStatus.value = 'none'
      membershipExpiry.value = null
    } catch (error) {
      membershipError.value = '取消会员失败'
      console.error('取消会员失败:', error)
      throw error
    } finally {
      isMembershipLoading.value = false
    }
  }

  return {
    // 状态
    membershipStatus,
    membershipExpiry,
    isMembershipLoading,
    membershipError,
    
    // 计算属性
    isMember,
    isMembershipExpired,
    membershipType,
    canAccessCourse,
    getMemberPrice,
    
    // Actions
    fetchMembershipStatus,
    subscribeMembership,
    cancelMembership
  }
})
```

## 2. 会员访问控制组件

```vue
<!-- components/membership/MembershipGate.vue -->
<template>
  <div>
    <!-- 会员可访问内容 -->
    <slot v-if="isAccessible">
      <!-- 会员专属内容将在这里渲染 -->
    </slot>
    
    <!-- 非会员提示 -->
    <div v-else class="membership-prompt">
      <h3>该内容仅对会员开放</h3>
      <p>成为会员即可访问所有进阶课程和专属优惠</p>
      <div class="membership-options">
        <button @click="subscribe('monthly')" class="btn btn-primary">
          月度会员 - ¥99/月
        </button>
        <button @click="subscribe('yearly')" class="btn btn-success">
          年度会员 - ¥999/年 (省¥189)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMembershipStore } from '@/store/membershipStore'

// Props
const props = defineProps<{
  requiredLevel?: 'beginner' | 'intermediate' | 'advanced'
}>()

const membershipStore = useMembershipStore()

// 计算当前内容是否可访问
const isAccessible = computed(() => {
  if (!props.requiredLevel) return true
  return membershipStore.canAccessCourse(props.requiredLevel)
})

// 订阅会员
const subscribe = (type: 'monthly' | 'yearly') => {
  membershipStore.subscribeMembership(type)
    .then(() => {
      // 订阅成功处理
      console.log('会员订阅成功')
    })
    .catch(error => {
      // 订阅失败处理
      console.error('会员订阅失败:', error)
    })
}
</script>

<style scoped>
.membership-prompt {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  margin: 20px 0;
}

.membership-options {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.membership-options button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
</style>
```

## 3. 在课程页面中使用会员访问控制

```vue
<!-- views/CourseDetails.vue - 集成会员访问控制 -->
<template>
  <div class="course-details">
    <h1>{{ course.name }}</h1>
    <p>{{ course.description }}</p>
    
    <!-- 课程价格 -->
    <div class="course-price">
      <span v-if="isMember" class="original-price">原价: ¥{{ course.price }}</span>
      <span class="current-price">
        当前价格: ¥{{ memberPrice }}
      </span>
    </div>
    
    <!-- 课程内容 - 使用会员访问控制组件 -->
    <MembershipGate :required-level="course.stage">
      <div class="course-content">
        <!-- 会员可访问的课程内容 -->
        <CourseCatalog :course="course" />
        <LessonPlayer :course="course" />
      </div>
    </MembershipGate>
    
    <!-- 非会员可访问的课程简介 -->
    <div class="course-preview">
      <h2>课程简介</h2>
      <p>{{ course.shortDescription }}</p>
      <CourseReviews :course-id="course.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCourseStore } from '@/store/courseStore'
import { useMembershipStore } from '@/store/membershipStore'
import MembershipGate from '@/components/membership/MembershipGate.vue'
import CourseCatalog from '@/components/course/CourseCatalog.vue'
import LessonPlayer from '@/components/course/LessonPlayer.vue'
import CourseReviews from '@/components/course/CourseReviews.vue'

const route = useRoute()
const courseStore = useCourseStore()
const membershipStore = useMembershipStore()

// 获取课程信息
const course = computed(() => {
  const slug = route.params.slug as string
  return courseStore.getCourseBySlug(slug)
})

// 计算会员价格
const memberPrice = computed(() => {
  return membershipStore.getMemberPrice(course.value.price)
})

// 检查会员状态
const isMember = computed(() => membershipStore.isMember)

// 页面加载时获取会员状态
onMounted(() => {
  membershipStore.fetchMembershipStatus()
})
</script>
```

## 4. 会员状态在导航栏中的显示

```vue
<!-- components/Navbar.vue - 添加会员状态显示 -->
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">多维AI课堂</a>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/courses">课程</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/programs">体系课</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/about">关于我们</a>
          </li>
        </ul>
        
        <!-- 会员状态显示 -->
        <div class="navbar-nav">
          <li v-if="isMember" class="nav-item dropdown">
            <a 
              class="nav-link dropdown-toggle" 
              href="#" 
              id="membershipDropdown" 
              role="button" 
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="badge bg-primary">会员</span>
              {{ membershipType === 'yearly' ? '年度会员' : '月度会员' }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="membershipDropdown">
              <li><a class="dropdown-item" href="/membership">会员中心</a></li>
              <li><a class="dropdown-item" href="/my-courses">我的课程</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" @click="cancelMembership">取消会员</a></li>
            </ul>
          </li>
          <li v-else class="nav-item">
            <a class="nav-link" href="/membership">开通会员</a>
          </li>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMembershipStore } from '@/store/membershipStore'

const membershipStore = useMembershipStore()

// 会员状态计算属性
const isMember = computed(() => membershipStore.isMember)
const membershipType = computed(() => membershipStore.membershipType)

// 取消会员
const cancelMembership = () => {
  if (confirm('确定要取消会员吗？')) {
    membershipStore.cancelMembership()
      .then(() => {
        console.log('会员取消成功')
      })
      .catch(error => {
        console.error('会员取消失败:', error)
      })
  }
}
</script>
```

## 最佳实践

1. **集中状态管理**：使用 Pinia 集中管理会员状态，确保状态一致性
2. **组件化封装**：将会员访问控制封装为可复用组件，便于在多个页面使用
3. **清晰的访问规则**：基于课程阶段定义明确的会员访问规则
4. **友好的提示**：为非会员用户提供清晰的升级提示和选项
5. **价格透明度**：明确显示原价和会员价，突出会员优惠
6. **加载状态处理**：处理会员状态加载和错误情况
7. **响应式设计**：确保会员相关 UI 在不同设备上都有良好的显示效果
8. **易于取消**：提供简单的会员取消流程，符合用户体验最佳实践
9. **实时更新**：会员状态变化时实时更新 UI
10. **安全考虑**：会员状态验证最终应在后端进行，前端仅作为体验优化