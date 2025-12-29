# Pinia 状态管理示例

## 推荐的 Pinia 存储结构

```typescript
// store/authStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 类型定义
interface UserInfo {
  id: number
  username: string
  email: string
  role: string
}

interface LoginCredentials {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const token = ref<string | null>(localStorage.getItem('token'))
  const userInfo = ref<UserInfo | null>(null)

  // Getters
  const isLoggedIn = computed(() => !!token.value)

  // Actions
  const login = async (credentials: LoginCredentials) => {
    // 实现登录逻辑
    try {
      const response = await api.login(credentials)
      token.value = response.data.token
      userInfo.value = response.data.user
      localStorage.setItem('token', response.data.token)
      return response.data
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    token.value = null
    userInfo.value = null
    localStorage.removeItem('token')
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    login,
    logout
  }
})
```

## 最佳实践

1. **单一责任**：每个存储处理一个特定域(身份验证、课程等)
2. **Composition API 风格**：使用 `defineStore()` 配合 setup 函数
3. **计算属性**：使用 Vue 的 `computed()` 处理派生状态
4. **持久化**：对关键数据使用 `localStorage`/`sessionStorage`
5. **错误处理**：包含加载状态和错误管理
6. **类型安全**：为所有状态和函数参数添加 TypeScript 类型
7. **模块化**：按功能模块划分存储文件

## 推荐的使用方式

```typescript
// 在组件中使用
import { useAuthStore } from '@/store/authStore'

const authStore = useAuthStore()

// 访问状态
if (authStore.isLoggedIn) {
  // 执行操作
}

// 调用 action
await authStore.login(credentials)
```