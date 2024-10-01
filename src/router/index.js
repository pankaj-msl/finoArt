import { createRouter, createWebHistory } from '@ionic/vue-router';
import  Microfin  from '../pages/Microfin.vue';
const routes = [
  {
    path: '/',
    redirect: '/microfin'
  },
  {
    path: '/microfin',
    component: Microfin
  },
  {
    path: '/transaction/:id',
    component: () => import('../pages/Transaction.vue')
  },
  {
    path: '/transactions',
    component: () => import('../pages/Transactions.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
