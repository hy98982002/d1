# 路由配置示例

## 1. 基本路由配置

```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

// 路由配置
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  },
  // 捕获所有未匹配的路由，重定向到 404 页面
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
```

## 2. 动态路由配置

```typescript
// router/index.ts - 添加动态路由
const routes = [
  // ... 其他路由
  {
    // 课程详情页 - 动态路由
    path: '/course/:slug',
    name: 'CourseDetails',
    component: () => import('@/views/CourseDetails.vue'),
    props: true
  },
  {
    // Program 动态路由：支持 /program/aigc-intermediate、/program/ai-designer-advanced 等
    path: '/program/:slug',
    name: 'Program',
    component: () => import('@/views/program/[slug].vue'),
    props: true,
    // 路由守卫：验证资源存在性
    beforeEnter: (to, from, next) => {
      const courseStore = useCourseStore()
      const slug = to.params.slug as string
      const program = courseStore.getProgramBySlug(slug)

      if (program) {
        next()
      } else {
        next('/404')
      }
    }
  },
  {
    // Level 页面路由
    path: '/levels/:level',
    name: 'Level',
    component: () => import('@/views/LevelView.vue'),
    props: true,
    // 路由守卫：验证 level 参数的有效性
    beforeEnter: (to, from, next) => {
      const validLevels = ['beginner', 'intermediate', 'advanced']
      const level = to.params.level as string
      
      if (validLevels.includes(level)) {
        next()
      } else {
        next('/404')
      }
    }
  },
  {
    // 旧链接兼容路由：/course/:id (数字ID) → 重定向到 /course/:slug
    path: '/course/:id(d+)',
    redirect: to => {
      const courseStore = useCourseStore()
      const courseId = parseInt(to.params.id as string)
      const course = courseStore.courses.find(c => c.id === courseId)

      if (course && course.slug) {
        return { name: 'CourseDetails', params: { slug: course.slug } }
      } else {
        return '/404'
      }
    }
  }
]
```

## 3. 路由守卫

### 3.1 全局前置守卫

```typescript
// router/index.ts - 添加全局前置守卫
router.beforeEach((to, from, next) => {
  // 可以在这里添加全局的路由守卫逻辑，例如身份验证
  const authStore = useAuthStore()
  
  // 定义需要身份验证的路由
  const requiresAuth = ['PersonalCenter', 'Order', 'ShoppingCart']
  
  if (requiresAuth.includes(to.name as string) && !authStore.isLoggedIn) {
    // 需要登录但未登录，重定向到登录页
    next('/login')
  } else {
    // 不需要登录或已登录，继续路由导航
    next()
  }
})
```

### 3.2 全局解析守卫

```typescript
// router/index.ts - 添加全局解析守卫
router.beforeResolve(async (to, from, next) => {
  // 可以在这里添加数据预加载逻辑
  if (to.name === 'CourseDetails') {
    const courseStore = useCourseStore()
    const slug = to.params.slug as string
    
    // 检查课程数据是否已加载
    if (!courseStore.courses.some(course => course.slug === slug)) {
      try {
        // 预加载课程数据
        await courseStore.fetchCourseBySlug(slug)
        next()
      } catch (error) {
        // 加载失败，重定向到 404
        next('/404')
      }
    } else {
      next()
    }
  } else {
    next()
  }
})
```

### 3.3 全局后置钩子

```typescript
// router/index.ts - 添加全局后置钩子
router.afterEach((to, from) => {
  // 可以在这里添加页面访问统计、日志记录等
  console.log(`从 ${from.path} 导航到 ${to.path}`)
  
  // 可以在这里添加页面标题设置
  const pageTitles: Record<string, string> = {
    'Home': '首页',
    'About': '关于我们',
    'CourseDetails': '课程详情',
    'Program': '体系课',
    'Level': '学习阶段'
  }
  
  if (pageTitles[to.name as string]) {
    document.title = `${pageTitles[to.name as string]} - 多维AI课堂`
  } else {
    document.title = '多维AI课堂'
  }
})
```

## 4. 嵌套路由

```typescript
// router/index.ts - 添加嵌套路由
const routes = [
  // ... 其他路由
  {
    path: '/personal-center',
    name: 'PersonalCenter',
    component: () => import('@/views/PersonalCenter.vue'),
    children: [
      {
        path: '',
        redirect: 'dashboard'
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/components/personCenter/PersonalDashboard.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/components/personCenter/AccountSettings.vue')
      },
      {
        path: 'my-courses',
        name: 'MyCourses',
        component: () => import('@/components/personCenter/MyCourses.vue')
      }
    ]
  }
]
```

## 5. 在组件中使用路由

```vue
<template>
  <div>
    <!-- 使用 router-link 进行导航 -->
    <router-link to="/">首页</router-link>
    <router-link :to="{ name: 'CourseDetails', params: { slug: 'beginner-python' } }">
      Python 基础课程
    </router-link>
    
    <!-- 编程式导航 -->
    <button @click="navigateToAbout">关于我们</button>
    
    <!-- 动态路由参数 -->
    <div v-if="$route.params.slug">
      当前课程: {{ $route.params.slug }}
    </div>
    
    <!-- 路由视图 -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// 编程式导航
const navigateToAbout = () => {
  router.push('/about')
}

// 带参数的编程式导航
const navigateToCourse = (slug: string) => {
  router.push({
    name: 'CourseDetails',
    params: { slug }
  })
}

// 替换当前历史记录
const replaceRoute = () => {
  router.replace('/about')
}

// 返回上一页
const goBack = () => {
  router.back()
}

// 前进一页
const goForward = () => {
  router.forward()
}
</script>
```

## 最佳实践

1. **懒加载**：使用动态导入 `() => import('@/views/XXX.vue')` 实现组件懒加载，减少初始加载时间
2. **路由守卫**：合理使用路由守卫进行身份验证、数据预加载和路由验证
3. **动态路由**：为不同类型的内容使用动态路由，如 `/course/:slug`、`/program/:slug`
4. **重定向处理**：处理旧链接兼容、404 页面和未匹配路由
5. **嵌套路由**：使用嵌套路由组织复杂页面结构
6. **命名路由**：使用命名路由进行编程式导航，提高代码可维护性
7. **Props 传递**：使用 `props: true` 将路由参数传递给组件
8. **路由元信息**：可以使用 `meta` 字段存储路由相关的元信息，如是否需要身份验证
9. **类型安全**：为路由参数添加 TypeScript 类型定义
10. **性能优化**：避免在路由守卫中执行过于复杂的逻辑，影响导航性能