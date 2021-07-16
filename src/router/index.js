import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import Login from '../views/Login.vue'
import Meta from 'vue-meta'

Vue.use(VueRouter)
Vue.use(Meta)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/sale',
    name: 'sale',
    component: () => import('../views/DSale.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/Setting')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../views/Map')
  },
  {
    path: '/overdue',
    name: 'overdue',
    component: () => import('../views/Overdue')
  },
  {
    path: '/hr',
    name: 'hr',
    component: () => import('../views/hr')
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: () => import('../views/inventory')
  },
  {
    path: '/changepassword',
    name: 'changepassword',
    component: () => import('../views/changePassword')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register')
  },
  {
    path: '/sale/:name',
    name: 'salename',
    component: () => import('../components/DDSale')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/dashboard')
  },
  {
    path: '/marketing',
    name: 'marketing',
    component: () => import('../views/marketing')
  },
  {
    path: '/accounting',
    name: 'accounting',
    component: () => import('../views/accounting')
  },
  {
    path: '/management',
    name: 'management',
    component: () => import('../views/management')
  },
  {
    path: '/monthly',
    name: 'managements',
    component: () => import('../views/management_monthly')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
