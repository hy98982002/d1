<template>
  <div v-if="program" class="program-view">
    <!-- 页面头部 -->
    <section class="program-hero" :style="{ background: program.heroBackground }">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">首页</a></li>
                <li class="breadcrumb-item"><a href="/#courses">课程</a></li>
                <li class="breadcrumb-item active" aria-current="page">{{ program.name }}</li>
              </ol>
            </nav>
            <h1 class="program-title">{{ program.name }}</h1>
            <p class="program-subtitle">{{ program.subtitle }}</p>
            <div class="program-meta">
              <span class="meta-item">
                <i class="fas fa-layer-group me-1"></i>
                {{ programCourses.length }} 门精选课程
              </span>
              <span class="meta-item">
                <i class="fas fa-clock me-1"></i>
                {{ totalDuration }}+ 小时内容
              </span>
              <span class="meta-item">
                <i class="fas fa-chart-line me-1"></i>
                {{ stageLabel }}级别
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Program介绍 -->
    <section class="program-intro">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <h2 class="section-title">学习路径介绍</h2>
            <p class="intro-text">
              {{ program.description }}
            </p>
            <div class="learning-outcomes">
              <h3 class="outcomes-title">学习收获</h3>
              <ul class="outcomes-list">
                <li v-for="(outcome, index) in program.outcomes" :key="index">
                  <i class="fas fa-check-circle text-success me-2"></i>
                  {{ outcome }}
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="program-card">
              <h3 class="card-title">{{ program.benefitsTitle }}</h3>
              <ul class="benefits-list">
                <li v-for="(benefit, index) in program.benefits" :key="index">
                  <i :class="benefit.icon + ' me-2'"></i>
                  {{ benefit.text }}
                </li>
              </ul>
              <button :class="'btn w-100 mt-3 ' + program.buttonClass">
                {{ program.buttonText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 课程列表 -->
    <section class="program-courses">
      <div class="container">
        <div class="row mb-4">
          <div class="col-12">
            <h2 class="section-title">包含课程</h2>
            <p class="section-description">{{ program.courseDescription }}</p>
          </div>
        </div>

        <!-- Advanced阶段课程为空时的友好提示 -->
        <div v-if="programCourses.length === 0" class="row">
          <div class="col-12">
            <div class="empty-courses-notice">
              <i class="fas fa-clock fa-3x text-muted mb-3"></i>
              <h3>该学习路径的课程即将推出</h3>
              <p class="text-muted">我们正在精心准备高质量的课程内容，敬请期待！</p>
            </div>
          </div>
        </div>

        <!-- 课程列表 -->
        <div v-else class="row">
          <CourseCard
            v-for="(course, index) in programCourses"
            :key="course.id"
            :course="course"
            :index="index"
            @add-to-cart="handleAddToCart"
            @watch-now="handleWatchNow"
          />
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import CourseCard from '@/components/CourseCard.vue'
import { useCourseStore } from '@/store/courseStore'
import { useUIStore } from '@/store/uiStore'
import { buildProgramJsonLd } from '@/utils/jsonld'
import type { Course } from '@/types'

// Props
const props = defineProps<{
  slug: string
}>()

// Stores
const courseStore = useCourseStore()
const uiStore = useUIStore()
const router = useRouter()

// 获取Program配置
const program = computed(() => {
  const p = courseStore.getProgramBySlug(props.slug)
  if (!p) {
    router.push('/404')
    return null
  }
  return p
})

// 获取对应阶段的课程（可能为空数组）
const programCourses = computed(() => {
  if (!program.value) return []
  return courseStore.getCoursesByStage(program.value.stage)
})

// 计算总时长
const totalDuration = computed(() => {
  const total = programCourses.value.reduce((sum, course) => {
    // 从duration字符串中提取数字（例如 "30小时" -> 30）
    const match = course.duration?.match(/(\d+)/)
    return sum + (match ? parseInt(match[1]) : 0)
  }, 0)
  return total
})

// 阶段标签显示
const stageLabel = computed(() => {
  if (!program.value) return ''
  const labels: Record<string, string> = {
    basic: '基础',
    intermediate: '进阶',
    advanced: '高阶'
  }
  return labels[program.value.stage] || program.value.stage
})

// 使用统一工具构建 Program JSON-LD 结构化数据
const programJsonLd = computed(() => {
  if (!program.value) return ''

  const jsonLd = buildProgramJsonLd({
    stage: program.value.stage,
    name: program.value.name,
    description: program.value.description || program.value.subtitle,
    courses: programCourses.value,
    timeToComplete: `P${totalDuration.value}H`
  })
  return JSON.stringify(jsonLd, null, 2)
})

// 事件处理
const handleAddToCart = (course: Course) => {
  console.log('添加到购物车:', course.title)
  uiStore.showSuccess('添加成功', `${course.title} 已添加到购物车`)
}

const handleWatchNow = (course: Course) => {
  if (course.slug) {
    router.push({ name: 'CourseDetails', params: { slug: course.slug } })
  }
}

// 手动插入JSON-LD和Meta标签到DOM
let jsonLdScript: HTMLScriptElement | null = null
let metaTags: HTMLMetaElement[] = []

onMounted(() => {
  if (!program.value) return

  // 创建script标签并插入JSON-LD
  if (programJsonLd.value) {
    jsonLdScript = document.createElement('script')
    jsonLdScript.type = 'application/ld+json'
    jsonLdScript.textContent = programJsonLd.value
    document.head.appendChild(jsonLdScript)
  }

  // 构建SEO友好的meta标签
  const pageTitle = `${program.value.name} - 多维AI课堂`
  const pageDescription = program.value.description || program.value.subtitle
  const pageUrl = `https://www.doviai.com/program/${props.slug}`

  // 更新页面标题
  document.title = pageTitle

  // 添加meta标签
  const metaConfigs = [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: pageUrl },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription }
  ]

  metaConfigs.forEach(config => {
    const meta = document.createElement('meta')
    if (config.name) {
      meta.setAttribute('name', config.name)
    }
    if (config.property) {
      meta.setAttribute('property', config.property)
    }
    meta.setAttribute('content', config.content)
    document.head.appendChild(meta)
    metaTags.push(meta)
  })
})

onUnmounted(() => {
  // 清理：移除JSON-LD script标签
  if (jsonLdScript && jsonLdScript.parentNode) {
    jsonLdScript.parentNode.removeChild(jsonLdScript)
  }

  // 清理：移除所有meta标签
  metaTags.forEach(tag => {
    if (tag.parentNode) {
      tag.parentNode.removeChild(tag)
    }
  })
  metaTags = []

  // 恢复默认标题
  document.title = '多维AI课堂'
})
</script>

<style scoped>
/* 页面容器 */
.program-view {
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 248, 255, 0.98) 100%);
}

/* 头部区域 */
.program-hero {
  padding: 3rem 0 2rem;
}

.breadcrumb {
  background: transparent;
  padding: 0;
  margin-bottom: 1rem;
}

.breadcrumb-item a {
  color: #1e7f98;
  text-decoration: none;
}

.breadcrumb-item.active {
  color: #666;
}

.program-title {
  font-size: 2.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.program-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.program-meta {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.meta-item {
  color: #1e7f98;
  font-size: 1rem;
  font-weight: 500;
}

.meta-item i {
  color: #2a9bb8;
}

/* 介绍区域 */
.program-intro {
  padding: 3rem 0;
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.intro-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  margin-bottom: 2rem;
}

.learning-outcomes {
  margin-top: 2rem;
}

.outcomes-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.outcomes-list {
  list-style: none;
  padding: 0;
}

.outcomes-list li {
  padding: 0.75rem 0;
  font-size: 1.05rem;
  color: #444;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.outcomes-list li:last-child {
  border-bottom: none;
}

/* 权益卡片 */
.program-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: sticky;
  top: 100px;
}

.card-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}

.benefits-list {
  list-style: none;
  padding: 0;
}

.benefits-list li {
  padding: 0.75rem 0;
  font-size: 1rem;
  color: #444;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.benefits-list li:last-child {
  border-bottom: none;
}

/* 课程列表区域 */
.program-courses {
  padding: 3rem 0;
  background: rgba(255, 255, 255, 0.5);
}

.section-description {
  font-size: 1.05rem;
  color: #666;
  margin-bottom: 2rem;
}

/* Advanced阶段课程为空的友好提示 */
.empty-courses-notice {
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.empty-courses-notice h3 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.empty-courses-notice p {
  font-size: 1.1rem;
}

/* 按钮样式 */
.btn-tech-blue {
  background: linear-gradient(135deg, #1e7f98, #2a9bb8);
  border: none;
  border-radius: 50px;
  padding: 15px 30px;
  font-weight: 600;
  font-size: 1.05rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(30, 127, 152, 0.3);
  color: white;
}

.btn-tech-blue:hover {
  background: linear-gradient(135deg, #166d84, #228ba1);
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(30, 127, 152, 0.4);
  color: white;
}

.btn-premium-brown {
  background: linear-gradient(135deg, #8b4513, #b8860b);
  border: none;
  border-radius: 50px;
  padding: 15px 30px;
  font-weight: 600;
  font-size: 1.05rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(139, 69, 19, 0.3);
  color: white;
}

.btn-premium-brown:hover {
  background: linear-gradient(135deg, #6b3410, #9a720a);
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(139, 69, 19, 0.4);
  color: white;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .program-card {
    position: static;
    margin-top: 2rem;
  }
}

@media (max-width: 768px) {
  .program-title {
    font-size: 2rem;
  }

  .program-meta {
    gap: 1rem;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>
