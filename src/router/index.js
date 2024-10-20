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
  },


  {
    path: '/budget/:id',
    component: () => import('../pages/Budget.vue'),
    props: true
  },
  {
    path: '/budgets',
    component: () => import('../pages/Budgets.vue'),
    props: true
  },

  {
    path: '/accounts',
    component: () => import('../pages/Accounts.vue'),
    props: true
  },
  {
    path: '/account/:id',
    component: () => import('../pages/Account.vue'),
    props: true
  },

  {
    path: '/categories',
    component: () => import('../pages/Categories.vue'),
    props: true
  },

  {
    path: '/party/:id',
    component: () => import('../pages/Party.vue'),
    props: true
  },
  {
    path: '/parties',
    component: () => import('../pages/Parties.vue'),
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 };
}
})

export default router
