import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/auth/login.vue'
import Dashboard from '../views/dashboard/dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
