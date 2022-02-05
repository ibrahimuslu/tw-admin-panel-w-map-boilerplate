import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Default from '@/views/layouts/default.vue'
import store from '../store' // your vuex store 
const storedUser = JSON.parse(localStorage.getItem('user')||"{}");
console.log(storedUser)
const ifNotAuthenticated = (to, from, next) => {
  
  if (!store.getters['auth/isLoggedIn'] ) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters['auth/isLoggedIn'] || storedUser.token) {
    next()
    return
  }
  next('/login')
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/pages/Login.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/pages/Home.vue'),
    beforeEnter: ifAuthenticated,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router