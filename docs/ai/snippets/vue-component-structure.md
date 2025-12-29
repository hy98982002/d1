# Vue 3 组件结构示例

## 推荐的组件结构

```vue
<template>
  <!-- 优先使用Bootstrap工具类 -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        <!-- 主要内容 -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/store/authStore'

// 接口定义
interface Props {
  title: string
  isVisible?: boolean
}

// Props和emits
const props = withDefaults(defineProps<Props>(), {
  isVisible: true
})

// 响应式数据
const loading = ref(false)
const authStore = useAuthStore()

// 计算属性
const displayTitle = computed(() => props.title.toUpperCase())

// 生命周期
onMounted(() => {
  // 组件初始化
})
</script>

<style scoped>
/* 仅在Bootstrap不足时使用自定义样式 */
</style>
```

## 最佳实践

1. **仅使用Composition API**：严格禁止使用Options API
2. **TypeScript 必需**：所有 `.vue` 文件必须使用 `<script setup lang="ts">`
3. **组件命名**：所有组件使用 PascalCase (如：`UserProfile.vue`)
4. **Props/Emits**：使用 TypeScript 接口定义 props
5. **优先使用Bootstrap工具类**：最小化自定义CSS
6. **响应式设计**：确保组件在所有屏幕尺寸上正常工作
7. **单一职责**：每个组件只负责一个功能