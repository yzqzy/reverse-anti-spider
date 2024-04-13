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
    path: '/token-verify',
    name: 'TokenVerify',
    component: () => import('@client/views/token-verify.vue')
  },
  {
    path: '/caesar-cipher-verify',
    name: 'CaesarCipherVerify',
    component: () => import('@client/views/caesar-cipher-verify.vue')
  },
  {
    path: '/cookie-verify',
    name: 'CookieVerify',
    component: () => import('@client/views/cookie-verify.vue')
  },
  {
    path: '/session-verify',
    name: 'SessionVerify',
    component: () => import('@client/views/session-verify.vue')
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
