# Axios 配置示例

## 1. Axios 基础配置

```typescript
// api/index.ts
import axios from 'axios'
import { useAuthStore } from '@/store/authStore'

// 创建 Axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器 - 自动附加 JWT 令牌
request.interceptors.request.use(
  config => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器 - 处理统一响应格式 + JWT 失效处理
request.interceptors.response.use(
  response => {
    // 直接返回 response.data，提取 { status, data, msg } 结构
    return response.data
  },
  error => {
    // 401 错误全局处理：JWT 失效自动登出
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
      // 可以添加跳转登录页的逻辑
      // router.push('/login')
    }
    
    console.error('API 错误:', error)
    return Promise.reject(error)
  }
)

export default request
```

## 2. API 服务模式

```typescript
// api/courses.ts
import request from './index'
import type { Course, CourseListResponse } from '@/types'

export const courseAPI = {
  // 获取课程列表
  getCourses: (stage?: string): Promise<CourseListResponse> => {
    return request.get('/courses/', { params: { stage } })
  },

  // 获取课程详情
  getCourseDetail: (id: number): Promise<Course> => {
    return request.get(`/courses/${id}/`)
  },

  // 搜索课程
  searchCourses: (query: string): Promise<CourseListResponse> => {
    return request.get('/courses/search/', { params: { q: query } })
  },

  // 创建课程（示例）
  createCourse: (courseData: Partial<Course>): Promise<Course> => {
    return request.post('/courses/', courseData)
  },

  // 更新课程（示例）
  updateCourse: (id: number, courseData: Partial<Course>): Promise<Course> => {
    return request.put(`/courses/${id}/`, courseData)
  },

  // 删除课程（示例）
  deleteCourse: (id: number): Promise<void> => {
    return request.delete(`/courses/${id}/`)
  }
}
```

## 3. API 类型定义

```typescript
// types/index.ts

export interface Course {
  id: number
  name: string
  slug: string
  description: string
  stage: 'beginner' | 'intermediate' | 'advanced'
  coverImage: string
  createdAt: string
  updatedAt: string
  // 其他课程相关字段
}

export interface CourseListResponse {
  status: number
  data: Course[]
  msg: string
  total?: number
  page?: number
  pageSize?: number
}

export interface ApiResponse<T = any> {
  status: number
  data: T
  msg: string
}
```

## 4. 在组件中使用 API

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { courseAPI } from '@/api/courses'
import type { Course } from '@/types'

// 响应式数据
const courses = ref<Course[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// 获取课程列表
const fetchCourses = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await courseAPI.getCourses('beginner')
    courses.value = response.data
  } catch (err) {
    error.value = '获取课程列表失败'
    console.error('获取课程失败:', err)
  } finally {
    loading.value = false
  }
}

// 组件挂载时获取数据
onMounted(() => {
  fetchCourses()
})
</script>

<template>
  <div class="course-list">
    <h2>课程列表</h2>
    
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">加载中...</div>
    
    <!-- 错误信息 -->
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <!-- 课程列表 -->
    <div v-else class="courses-grid">
      <div 
        v-for="course in courses" 
        :key="course.id" 
        class="course-card"
      >
        <h3>{{ course.name }}</h3>
        <p>{{ course.description }}</p>
      </div>
    </div>
  </div>
</template>
```

## 5. 错误处理最佳实践

```typescript
// utils/errorHandler.ts

export interface ApiError {
  status: number
  message: string
  data?: any
}

/**
 * 处理 API 错误
 * @param error 错误对象
 * @returns 格式化的错误对象
 */
export const handleApiError = (error: any): ApiError => {
  // 如果是 Axios 错误
  if (error.response) {
    // 服务器返回了错误状态码
    return {
      status: error.response.status,
      message: error.response.data.msg || '请求失败',
      data: error.response.data
    }
  } else if (error.request) {
    // 请求已发送但没有收到响应
    return {
      status: 0,
      message: '网络错误，服务器无响应'
    }
  } else {
    // 请求配置出错
    return {
      status: 0,
      message: error.message || '请求配置错误'
    }
  }
}

/**
 * 显示错误信息
 * @param error 错误对象
 */
export const showErrorToast = (error: any) => {
  const apiError = handleApiError(error)
  // 这里可以使用项目中的 Toast 组件或其他通知机制
  console.error('API 错误:', apiError.message)
  // 例如: useToast().error(apiError.message)
}
```

## 6. 在 API 调用中使用错误处理

```typescript
// 在组件中使用错误处理
import { showErrorToast } from '@/utils/errorHandler'

const fetchCourses = async () => {
  loading.value = true
  
  try {
    const response = await courseAPI.getCourses('beginner')
    courses.value = response.data
  } catch (err) {
    showErrorToast(err)
  } finally {
    loading.value = false
  }
}
```

## 最佳实践

1. **集中配置**：将 Axios 配置集中管理，便于维护和更新
2. **拦截器使用**：利用请求拦截器自动添加认证信息，利用响应拦截器统一处理错误
3. **类型安全**：为所有 API 请求和响应添加 TypeScript 类型定义
4. **模块化**：按功能模块划分 API 服务文件，提高代码可维护性
5. **错误处理**：实现统一的错误处理机制，提高用户体验
6. **环境变量**：使用环境变量配置 API 基础 URL，便于不同环境切换
7. **超时设置**：合理设置请求超时时间，避免请求长时间挂起
8. **请求取消**：为长时间运行的请求实现取消机制，避免内存泄漏
9. **重试机制**：对于网络不稳定的情况，可以实现请求重试机制
10. **日志记录**：在开发环境记录详细的 API 请求和响应日志，便于调试