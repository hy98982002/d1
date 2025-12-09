<template>
  <section class="membership-section py-5">
    <div class="container">
      <!-- 标题区域 -->
      <div class="row mb-4">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <div>
            <h2 class="membership-title mb-0">
              <span class="title-main">会员专享</span>
              <span class="title-sub ms-3">进阶实战课程</span>
            </h2>
            <p class="membership-subtitle mt-2">
              会员可访问所有进阶课程，加速技能提升
            </p>
          </div>
          <router-link
            to="/program/aigc-intermediate"
            class="btn btn-outline-primary d-none d-md-block"
          >
            查看全部 <i class="fas fa-arrow-right ms-2"></i>
          </router-link>
        </div>
      </div>

      <!-- 课程卡片区域 -->
      <div class="row">
        <!-- 显示已上线的会员课程（最多8门） -->
        <CourseCard
          v-for="(course, index) in displayCourses"
          :key="course.id"
          :course="course"
          :index="index"
        />

        <!-- 即将上线的课程占位卡片（最多显示2门） -->
        <div
          v-for="(course, index) in comingSoonCourses.slice(0, 2)"
          :key="`coming-soon-${course.id}`"
          class="col-sm-6 col-md-3 mb-4"
        >
          <div class="card h-100 coming-soon-card">
            <div class="card-img-top ratio ratio-16x9">
              <img
                :src="course.cover"
                :alt="`${course.title} - 即将上线`"
                class="w-100 h-100 object-fit-cover coming-soon-img"
                loading="lazy"
              />
              <div class="coming-soon-overlay">
                <i class="fas fa-clock fa-3x mb-3"></i>
                <h5>即将上线</h5>
              </div>
            </div>
            <div class="card-body">
              <p class="card-text">{{ course.title }}</p>
              <p class="text-muted small">{{ course.description }}</p>
            </div>
            <div class="card-footer">
              <span class="badge bg-info">会员专享</span>
              <span class="text-muted ms-2">敬请期待</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 移动端查看全部按钮 -->
      <div class="row mt-3 d-md-none">
        <div class="col-12 text-center">
          <router-link to="/program/aigc-intermediate" class="btn btn-outline-primary">
            查看全部会员课程 <i class="fas fa-arrow-right ms-2"></i>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCourseStore } from '@/store/courseStore'
import CourseCard from './CourseCard.vue'

const courseStore = useCourseStore()

// 获取所有会员课程（isVip: true）
const membershipCourses = computed(() => {
  return courseStore.courses.filter(course => course.isVip === true)
})

// 已上线的会员课程（status: 'active' 或 undefined）
const activeCourses = computed(() => {
  return membershipCourses.value.filter(
    course => course.status === 'active' || !course.status
  )
})

// 即将上线的会员课程（status: 'coming_soon'）
const comingSoonCourses = computed(() => {
  return membershipCourses.value.filter(course => course.status === 'coming_soon')
})

// 首页展示的课程（最多6门已上线课程）
const displayCourses = computed(() => {
  return activeCourses.value.slice(0, 6)
})
</script>

<style scoped>
/* 会员专享模块样式 */
.membership-section {
  background: linear-gradient(135deg, rgba(30, 127, 152, 0.02) 0%, rgba(42, 155, 184, 0.05) 100%);
}

/* 标题样式 */
.membership-title {
  text-align: left;
  font-weight: 600;
  font-size: 2rem;
  line-height: 1.4;
}

.title-main {
  color: #1e7f98;
  position: relative;
}

.title-main::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #1e7f98, #2a9bb8);
  border-radius: 2px;
}

.title-sub {
  color: #5c5b5b;
  font-weight: 500;
}

.membership-subtitle {
  color: #666;
  font-size: 1rem;
  margin-bottom: 0;
}

/* 即将上线卡片样式 */
.coming-soon-card {
  position: relative;
  border: 2px dashed #dee2e6;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.coming-soon-card:hover {
  border-color: #1e7f98;
  box-shadow: 0 4px 12px rgba(30, 127, 152, 0.1);
}

.coming-soon-img {
  filter: grayscale(100%) brightness(1.1);
}

.coming-soon-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(30, 127, 152, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  backdrop-filter: blur(4px);
}

.coming-soon-overlay i {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

/* 查看全部按钮样式 */
.btn-outline-primary {
  border: 2px solid #1e7f98;
  color: #1e7f98;
  background: white;
  border-radius: 50px;
  padding: 10px 28px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-outline-primary:hover {
  background: #1e7f98;
  border-color: #1e7f98;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 127, 152, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .membership-title {
    font-size: 1.6rem;
  }

  .title-sub {
    display: block;
    margin-top: 0.5rem;
    margin-left: 0 !important;
  }
}
</style>
