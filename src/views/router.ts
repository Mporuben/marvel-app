import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'

import Tabs from '@/views/tabs/Tabs.layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/search'
  },
  {
    path: '/hero/:id',
    component: () => import('@/views/hero/Hero.vue')
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/search'
      },
      {
        path: 'search',
        component: () => import('@/views/tabs/Search.vue')
      },
      {
        path: 'favorite',
        component: () => import('@/views/tabs/Favorite.vue')
      },

    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
