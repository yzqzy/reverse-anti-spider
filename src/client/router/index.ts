import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@client/views/home.vue')
  },
  {
    path: '/lesson05',
    name: 'Lesson05',
    component: () => import('@client/views/lesson05.vue')
  },
  {
    path: '/lesson06',
    name: 'Lesson06',
    component: () => import('@client/views/lesson06.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
