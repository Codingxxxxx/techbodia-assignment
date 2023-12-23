import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '@/views/error/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/page/:page',
      name: 'page',
      component: HomeView
    },
    {
      path: '/:catchAll(.*)',
      component: NotFound,
    },
  ]
})

export default router
