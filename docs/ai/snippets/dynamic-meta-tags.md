# 动态 Meta 标签示例

## 1. 基本动态 Meta 标签实现

```vue
<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'

// 组件接收的 props
const props = defineProps<{
  title: string
  description: string
  imageUrl?: string
  canonicalUrl?: string
}>()

// 动态生成 Meta 标签配置
const metaConfig = computed(() => [
  // 基本 Meta 标签
  { name: 'title', content: `${props.title} - 多维AI课堂` },
  { name: 'description', content: props.description },
  
  // Open Graph 标签（Facebook, LinkedIn 等）
  { property: 'og:title', content: `${props.title} - 多维AI课堂` },
  { property: 'og:description', content: props.description },
  { property: 'og:type', content: 'website' },
  { property: 'og:url', content: props.canonicalUrl || window.location.href },
  
  // Twitter 卡片
  { name: 'twitter:title', content: `${props.title} - 多维AI课堂` },
  { name: 'twitter:description', content: props.description },
  { name: 'twitter:card', content: 'summary_large_image' },
  
  // 可选的图像标签
  ...(props.imageUrl ? [
    { property: 'og:image', content: props.imageUrl },
    { name: 'twitter:image', content: props.imageUrl }
  ] : [])
])

// 用于跟踪添加的 Meta 标签，以便在组件卸载时清理
let addedMetaTags: HTMLMetaElement[] = []

onMounted(() => {
  // 设置页面标题
  document.title = `${props.title} - 多维AI课堂`
  
  // 添加或更新 Meta 标签
  metaConfig.value.forEach(config => {
    // 查找现有标签
    const [attrName, attrValue] = Object.entries(config)[0]
    let tag = document.querySelector<HTMLMetaElement>(`meta[${attrName}="${attrValue}"]`)
    
    if (!tag) {
      // 创建新标签
      tag = document.createElement('meta')
      
      // 设置所有属性
      Object.entries(config).forEach(([key, value]) => {
        tag!.setAttribute(key, value as string)
      })
      
      // 添加到文档头部
      document.head.appendChild(tag)
      addedMetaTags.push(tag)
    }
  })
  
  // 添加或更新 canonical 标签
  if (props.canonicalUrl) {
    let canonicalTag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    
    if (!canonicalTag) {
      canonicalTag = document.createElement('link')
      canonicalTag.rel = 'canonical'
      document.head.appendChild(canonicalTag)
      addedMetaTags.push(canonicalTag as any)
    }
    
    canonicalTag.href = props.canonicalUrl
  }
})

onUnmounted(() => {
  // 恢复默认页面标题
  document.title = '多维AI课堂'
  
  // 清理所有添加的 Meta 标签
  addedMetaTags.forEach(tag => {
    if (tag.parentNode) {
      tag.parentNode.removeChild(tag)
    }
  })
  
  // 清空数组
  addedMetaTags = []
})
</script>
```

## 2. 使用 Composition API 封装 Meta 标签管理

```typescript
// composables/useMetaTags.ts
import { ref, watch, onMounted, onUnmounted } from 'vue'

interface MetaTagConfig {
  name?: string
  property?: string
  content: string
}

interface UseMetaTagsOptions {
  title: string
  description: string
  imageUrl?: string
  canonicalUrl?: string
  defaultTitle?: string
}

export function useMetaTags(options: UseMetaTagsOptions) {
  const { 
    title, 
    description, 
    imageUrl, 
    canonicalUrl, 
    defaultTitle = '多维AI课堂' 
  } = options
  
  // 响应式数据
  const isMounted = ref(false)
  const addedTags = ref<HTMLElement[]>([])
  
  // 生成 Meta 标签配置
  const generateMetaConfig = () => {
    const fullTitle = `${title} - ${defaultTitle}`
    
    const config: MetaTagConfig[] = [
      // 基本 Meta 标签
      { name: 'title', content: fullTitle },
      { name: 'description', content: description },
      
      // Open Graph 标签
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl || window.location.href },
      
      // Twitter 卡片
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:card', content: 'summary_large_image' }
    ]
    
    // 添加图像标签（如果提供）
    if (imageUrl) {
      config.push(
        { property: 'og:image', content: imageUrl },
        { name: 'twitter:image', content: imageUrl }
      )
    }
    
    return config
  }
  
  // 更新 Meta 标签
  const updateMetaTags = () => {
    if (!isMounted.value) return
    
    // 清除现有标签
    cleanupMetaTags()
    
    // 设置页面标题
    document.title = `${title} - ${defaultTitle}`
    
    // 生成并添加新标签
    const metaConfig = generateMetaConfig()
    metaConfig.forEach(tagConfig => {
      const tag = document.createElement('meta')
      
      Object.entries(tagConfig).forEach(([key, value]) => {
        tag.setAttribute(key, value)
      })
      
      document.head.appendChild(tag)
      addedTags.value.push(tag)
    })
    
    // 添加或更新 canonical 标签
    if (canonicalUrl) {
      let canonicalTag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      
      if (!canonicalTag) {
        canonicalTag = document.createElement('link')
        canonicalTag.rel = 'canonical'
        document.head.appendChild(canonicalTag)
        addedTags.value.push(canonicalTag)
      }
      
      canonicalTag.href = canonicalUrl
    }
  }
  
  // 清理 Meta 标签
  const cleanupMetaTags = () => {
    addedTags.value.forEach(tag => {
      if (tag.parentNode) {
        tag.parentNode.removeChild(tag)
      }
    })
    
    addedTags.value = []
  }
  
  // 生命周期钩子
  onMounted(() => {
    isMounted.value = true
    updateMetaTags()
  })
  
  onUnmounted(() => {
    cleanupMetaTags()
    document.title = defaultTitle
  })
  
  // 监听属性变化
  watch([title, description, imageUrl, canonicalUrl], () => {
    updateMetaTags()
  })
  
  return {
    updateMetaTags,
    cleanupMetaTags
  }
}
```

## 3. 在组件中使用封装的 Meta 标签管理

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useCourseStore } from '@/store/courseStore'
import { useMetaTags } from '@/composables/useMetaTags'

const props = defineProps<{
  slug: string
}>()

const courseStore = useCourseStore()
const course = computed(() => courseStore.getCourseBySlug(props.slug))

// 使用封装的 useMetaTags 组合式函数
useMetaTags({
  title: course.value.name,
  description: course.value.description,
  imageUrl: course.value.coverImage,
  canonicalUrl: `https://www.doviai.com/course/${props.slug}`
})
</script>
```

## 最佳实践

1. **动态管理**：始终使用 `onMounted` 和 `onUnmounted` 生命周期钩子管理 Meta 标签，避免内存泄漏
2. **完整覆盖**：覆盖基本 Meta 标签、Open Graph 标签和 Twitter 卡片，确保在所有社交平台上都有良好的显示效果
3. **Canonical 标签**：为每个页面添加 canonical 标签，避免重复内容问题
4. **图像优化**：为社交媒体分享提供高质量的图像，尺寸建议为 1200x630px
5. **响应式更新**：当页面内容变化时，及时更新 Meta 标签
6. **性能考虑**：避免在短时间内频繁更新 Meta 标签，考虑使用防抖或节流
7. **测试验证**：使用 Facebook Sharing Debugger、Twitter Card Validator 等工具验证 Meta 标签的正确性
8. **默认值处理**：为所有 Meta 标签提供合理的默认值，确保页面在各种情况下都能正常显示

## 常见 Meta 标签参考

| 类型 | 标签 | 描述 | 示例值 |
|------|------|------|--------|
| 基本 | title | 页面标题 | `AI Photoshop Design Beginner - 多维AI课堂` |
| 基本 | description | 页面描述 | `Learn the basics of AI-powered Photoshop design.` |
| Open Graph | og:title | Facebook 分享标题 | `AI Photoshop Design Beginner - 多维AI课堂` |
| Open Graph | og:description | Facebook 分享描述 | `Learn the basics of AI-powered Photoshop design.` |
| Open Graph | og:type | 内容类型 | `website` |
| Open Graph | og:url | 规范 URL | `https://www.doviai.com/course/photoshop-ai-design-beginner` |
| Open Graph | og:image | 分享图像 | `https://www.doviai.com/images/photoshop-beginner-cover-1200x630.jpg` |
| Twitter | twitter:title | Twitter 分享标题 | `AI Photoshop Design Beginner - 多维AI课堂` |
| Twitter | twitter:description | Twitter 分享描述 | `Learn the basics of AI-powered Photoshop design.` |
| Twitter | twitter:card | 卡片类型 | `summary_large_image` |
| Twitter | twitter:image | 分享图像 | `https://www.doviai.com/images/photoshop-beginner-cover-1200x630.jpg` |