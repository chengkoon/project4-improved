import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Index from '@/components/Index'
import About from '@/components/About'
// import User from '@/components/User'
// import Register from '@/components/Register'
// import Login from '@/components/Login'
// import flashmessage from '@/components/flashmessage'
// import UserHome from '@/components/UserHome'
import Success from '@/components/Success'
import auth from '../auth'
// import Bye from '@/components/Bye'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter)

// export default new Router({
// export const router = new VueRouter({
export const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { requiresUserAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/signout',
    beforeEnter (to, from, next) {
      auth.signoutUser()
      next('/')
    }
  },
  // {
  //   path: '/sponsor',
  //   name: 'sponsor',
  //   component: Sponsor,
  //   children: [
  //     {
  //       path: 'register',
  //       name: 'register',
  //       component: Register
  //     },
  //     {
  //       path: 'login',
  //       name: 'login',
  //       component: Login
  //     }
  //   ]
  // },
  // {
  //   path: '/register',
  //   name: 'register',
  //   component: Register
  // },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login
  // },
  {
    path: '/success',
    name: 'success',
    component: Success,
    meta: { requiresUserAuth: true }
  }
]
//   mode: 'history'
// })
