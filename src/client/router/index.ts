import { createRouter, createWebHistory } from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routeFiles = import.meta.glob('../views/*.vue')
const routes = Object.keys(routeFiles).map(path => {
  const fileName = path.replace('../views/', '').replace('.vue', '')
  return {
    path: `/${fileName.toLowerCase()}`,
    component: routeFiles[path]
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    ...routes
  ]
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
