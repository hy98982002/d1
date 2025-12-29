# JSON-LD 结构化数据示例

## 1. Program 页面 JSON-LD 实现

```vue
<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useCourseStore } from '@/store/courseStore'
import { buildProgramJsonLd } from '@/utils/jsonld'

const props = defineProps<{
  slug: string
}>()

const courseStore = useCourseStore()
const program = computed(() => courseStore.getProgramBySlug(props.slug))
const programCourses = computed(() => courseStore.getProgramCourses(props.slug))

// 动态生成 Program JSON-LD
const programJsonLd = computed(() =>
  buildProgramJsonLd({
    stage: program.value.stage,
    name: program.value.name,
    description: program.value.description,
    courses: programCourses.value,
    timeToComplete: `${programCourses.value.length * 30}小时`
  })
)

// 动态注入 JSON-LD 到 DOM
let jsonLdScript: HTMLScriptElement | null = null

onMounted(() => {
  // 创建 script 标签并插入 JSON-LD
  jsonLdScript = document.createElement('script')
  jsonLdScript.type = 'application/ld+json'
  jsonLdScript.textContent = JSON.stringify(programJsonLd.value)
  document.head.appendChild(jsonLdScript)
})

onUnmounted(() => {
  // 清理：移除 JSON-LD script 标签
  if (jsonLdScript && jsonLdScript.parentNode) {
    jsonLdScript.parentNode.removeChild(jsonLdScript)
  }
})
</script>
```

## 2. Course 页面 JSON-LD 示例

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "AI Photoshop Design Beginner",
  "description": "Learn the basics of AI-powered Photoshop design.",
  "educationalLevel": {
    "@type": "DefinedTerm",
    "name": "Beginner",
    "@id": "https://www.doviai.com/levels/beginner"
  },
  "educationalUse": ["Lecture", "Demonstration", "Exercise"],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "CNY",
    "availability": "https://schema.org/InStock"
  },
  "provider": {
    "@type": "Organization",
    "name": "多维AI课堂",
    "url": "https://www.doviai.com"
  },
  "coursePrerequisites": {
    "@type": "AlignmentObject",
    "alignmentType": "requires",
    "targetName": "基础电脑操作知识"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "online",
    "startDate": "2025-01-01",
    "endDate": "2025-12-31",
    "maxParticipants": 1000
  }
}
```

## 3. Level 页面 JSON-LD 示例

```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "name": "Learning Levels",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "name": "Beginner",
      "description": "适合零基础学员，提供软件基础和快速理解的免费课程。",
      "url": "https://www.doviai.com/levels/beginner"
    },
    {
      "@type": "DefinedTerm",
      "name": "Intermediate",
      "description": "适合有基础的学员，提供技能训练和任务练习。",
      "url": "https://www.doviai.com/levels/intermediate"
    },
    {
      "@type": "DefinedTerm",
      "name": "Advanced",
      "description": "适合进阶学员，提供企业项目和商业案例。",
      "url": "https://www.doviai.com/levels/advanced"
    }
  ]
}
```

## 4. 动态 Meta 标签实现

```vue
<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useCourseStore } from '@/store/courseStore'

const props = defineProps<{
  slug: string
}>()

const courseStore = useCourseStore()
const program = computed(() => courseStore.getProgramBySlug(props.slug))

// 动态生成 Meta 标签
const metaTags = computed(() => ({
  title: `${program.value.name} - 多维AI课堂`,
  description: program.value.description,
  ogTitle: `${program.value.name} - 多维AI课堂`,
  ogDescription: program.value.description,
  ogType: 'website',
  twitterTitle: `${program.value.name} - 多维AI课堂`,
  twitterDescription: program.value.description
}))

// 动态管理 Meta 标签
let addedMetaTags: HTMLMetaElement[] = []

onMounted(() => {
  // 设置页面标题
  document.title = metaTags.value.title

  // 添加或更新 meta 标签
  const metaConfig = [
    { name: 'description', content: metaTags.value.description },
    { property: 'og:title', content: metaTags.value.ogTitle },
    { property: 'og:description', content: metaTags.value.ogDescription },
    { property: 'og:type', content: metaTags.value.ogType },
    { name: 'twitter:title', content: metaTags.value.twitterTitle },
    { name: 'twitter:description', content: metaTags.value.twitterDescription }
  ]

  metaConfig.forEach(config => {
    let tag = document.querySelector(
      `meta[${Object.keys(config)[0]}="${Object.values(config)[0]}"]`
    )
    if (!tag) {
      tag = document.createElement('meta')
      Object.entries(config).forEach(([key, value]) => {
        tag!.setAttribute(key, value as string)
      })
      document.head.appendChild(tag)
      addedMetaTags.push(tag)
    }
  })
})

onUnmounted(() => {
  // 清理：恢复默认标题和移除动态添加的 meta 标签
  document.title = '多维AI课堂'
  addedMetaTags.forEach(tag => {
    if (tag.parentNode) {
      tag.parentNode.removeChild(tag)
    }
  })
  addedMetaTags = []
})
</script>
```

## 最佳实践

1. **真实表达原则**：JSON-LD 必须准确反映实际页面内容，禁止虚假宣传
2. **动态管理**：使用 `onMounted` 和 `onUnmounted` 生命周期钩子管理 JSON-LD，避免内存泄漏
3. **结构化数据类型**：根据页面类型选择正确的 Schema.org 类型（Course, EducationalOccupationalProgram, DefinedTermSet 等）
4. **教育级别格式**：使用 DefinedTerm 格式表示 educationalLevel，并链接到对应的 level 页面
5. **完整属性**：包含必要的属性，如 name, description, provider, offers 等
6. **测试验证**：使用 Google 结构化数据测试工具验证 JSON-LD 格式的正确性
7. **性能优化**：避免在初始加载时生成大量 JSON-LD，考虑延迟加载或按需生成
8. **一致性**：确保 JSON-LD 中的信息与页面内容、URL 结构保持一致