import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/authStore'
import { useCourseStore } from '../store/courseStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      // 旧链接兼容路由：/course/:id (数字ID) → 重定向到 /course/:slug
      path: '/course/:id(\\d+)',
      redirect: to => {
        const courseStore = useCourseStore()
        const courseId = parseInt(to.params.id as string)
        const course = courseStore.courses.find(c => c.id === courseId)

        if (course && course.slug) {
          // 301重定向到新的slug格式
          return { name: 'CourseDetails', params: { slug: course.slug } }
        } else {
          // 课程不存在，重定向到404
          return '/404'
        }
      }
    },
    {
      path: '/course/:slug',
      name: 'CourseDetails',
      component: () => import('../views/CourseDetails.vue'),
      props: true, // 将slug作为prop传递给组件
      beforeEnter: (to, from) => {
        // 路由守卫：验证课程slug是否存在
        const courseStore = useCourseStore()
        const slug = to.params.slug as string
        const course = courseStore.getCourseBySlug(slug)

        if (course) {
          return true // 课程存在，允许访问
        } else {
          return '/404' // 课程不存在，重定向到404页面
        }
      }
    },
    {
      path: '/cart',
      name: 'ShoppingCart',
      component: () => import('../views/ShoppingCart.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/order/:id?',
      name: 'Order',
      component: () => import('../views/Order.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/user',
      name: 'PersonalCenter',
      component: () => import('../views/PersonalCenter.vue'),
      meta: { requiresAuth: true }
    },
    {
      // 动态Program路由：支持所有Program slug
      path: '/program/:slug',
      name: 'Program',
      component: () => import('../views/program/[slug].vue'),
      props: true, // 将slug作为prop传递给组件
      beforeEnter: (to, from) => {
        // 路由守卫：验证Program slug是否存在
        const courseStore = useCourseStore()
        const slug = to.params.slug as string
        const program = courseStore.getProgramBySlug(slug)

        if (program) {
          return true // Program存在，允许访问
        } else {
          return '/404' // Program不存在，重定向到404
        }
      }
    },
    {
      // 404页面路由
      path: '/404',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    },
    {
      // 捕获所有未匹配的路由
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ]
})

// 全局前置守卫，处理需要登录的路由
router.beforeEach((to, from) => {
  const authStore = useAuthStore()

  // 如果需要登录且用户未登录，重定向到登录页
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // 在实际项目中，这里应该重定向到登录页，并携带回调地址
    // 但由于我们要支持F12虚拟登录，所以这里直接放行
    console.log('需要登录才能访问此页面，但由于支持F12虚拟登录，所以放行')
    return true
  } else {
    return true
  }
})

export default router
