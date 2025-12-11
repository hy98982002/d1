<template>
  <section id="vip-courses" class="vip-section">
    <div class="container">
      <!-- 区域标题 -->
      <div class="row mb-3" style="margin-top: -0.3rem">
        <div class="col-12">
          <h2 class="section-title text-start" data-aos="fade-up">
            <span class="vip-icon">👑</span>
            <span class="black-text">会员专区</span>
            <span class="divider"></span>
            <span class="title-highlight">深度进阶课程</span>
          </h2>
          <p class="section-description text-start" data-aos="fade-up" data-aos-delay="200">
            专为会员打造的深度进阶课程，系统化提升你的专业技能和实战能力
          </p>
        </div>
      </div>

      <!-- 课程网格 -->
      <div class="row">
        <div class="col-12">
          <CourseGrid
            :courses="displayedCourses"
            stage="intermediate"
            :show-load-more="false"
            :loading="loading"
            @add-to-cart="handleAddToCart"
            @watch-now="handleWatchNow"
          />
        </div>
      </div>

      <!-- 显示更多/更少按钮 -->
      <div class="row mt-4">
        <div class="col-12 text-start">
          <button
            class="btn btn-outline-vip-gold btn-lg"
            @click="toggleShowMore"
            :disabled="loading"
          >
            <i
              class="fas"
              :class="showAllCourses ? 'fa-chevron-up' : 'fa-chevron-down'"
              :style="{ marginRight: '0.5rem' }"
            ></i>
            {{ showAllCourses ? '收起课程' : '查看更多课程' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CourseGrid from './CourseGrid.vue'
import { useCourseStore } from '../store/courseStore'
import { useUIStore } from '../store/uiStore'
import type { Course } from '../types'

// Props
interface Props {
  initialDisplayCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  initialDisplayCount: 8
})

// Stores
const courseStore = useCourseStore()
const uiStore = useUIStore()

// 响应式状态
const showAllCourses = ref(false)
const loading = ref(false)

// 计算属性
const vipCourses = computed(() => {
  return courseStore.vipCourses
})

const displayedCourses = computed(() => {
  if (showAllCourses.value) {
    return vipCourses.value
  }
  return vipCourses.value.slice(0, props.initialDisplayCount)
})

// 方法
const toggleShowMore = () => {
  showAllCourses.value = !showAllCourses.value
}

const handleAddToCart = (course: Course) => {
  console.log('添加到购物车:', course.title)
  uiStore.showSuccess('添加成功', `${course.title} 已添加到购物车`)
}

const handleWatchNow = (course: Course) => {
  console.log('立即观看:', course.title)
  // 这里可以导航到观看页面
}
</script>

<style scoped>
.vip-section {
  background: linear-gradient(135deg, rgba(255, 249, 235, 0.95) 0%, rgba(255, 245, 220, 0.98) 100%);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  min-height: 60vh;
  padding-top: 18px;
  padding-bottom: 5rem;
}

/* 标题样式 */
.section-title {
  font-size: 2.4rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* VIP 图标样式 */
.vip-icon {
  font-size: 2.2rem;
  display: inline-block;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* 黑色文字样式 */
.black-text {
  color: #000000;
  font-weight: 600;
  display: inline-block;
  text-shadow: 0 0 0.5px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.02em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 竖直分隔符 */
.divider {
  width: 7px;
  height: 0.5em;
  background-color: #d4af37;
  display: inline-block;
  margin: 0 0.2rem;
  align-self: center;
  transform: translateY(0.05em);
}

.title-highlight {
  background: linear-gradient(135deg, #d4af37, #f4d03f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  font-weight: 550;
  text-shadow: 0 0 0.5px rgba(0, 0, 0, 0.05);
}

.section-description {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0;
  line-height: 1.6;
  margin-top: -0.2rem;
}

/* 按钮样式 */
.btn-outline-vip-gold {
  border: 2px solid #d4af37;
  color: #d4af37;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50px;
  padding: 13px 38px;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

.btn-outline-vip-gold:hover {
  background: linear-gradient(135deg, #d4af37, #f4d03f);
  border-color: #d4af37;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .section-title {
    font-size: 2.2rem;
  }

  .vip-icon {
    font-size: 2rem;
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 1.8rem;
  }

  .vip-icon {
    font-size: 1.6rem;
  }

  .btn-outline-vip-gold {
    padding: 12px 30px;
    font-size: 1rem;
  }
}
</style>
