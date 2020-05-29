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
    path: '/overdue',
    name: 'overdue',
    component: () => import('../views/Overdue')
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
    path: '/sale/:name',
    name: 'salename',
    component: () => import('../components/DDSale')
  },
  {
    path: '/page-not-found',
    name: 'pagenotfound',
    component: () => import('../views/Pagenotfound')
  },
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/sale/:name',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
