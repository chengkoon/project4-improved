import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
// import Tikam from '@/components/Tikam'
import About from '@/components/About'
import ProfileModal from '@/components/modals/ProfileModal'
import SigninModal from '@/components/modals/SigninModal.vue'
import SignupModal from '@/components/modals/SignupModal.vue'
import PostItemModal from '@/components/modals/PostItemModal.vue'
import ItemDetailsModal from '@/components/modals/ItemDetailsModal.vue'
// import User from '@/components/User'
// import Register from '@/components/Register'
// import Login from '@/components/Login'
// import flashmessage from '@/components/flashmessage'
// import UserHome from '@/components/UserHome'
// import Success from '@/components/Success'
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
    name: '/'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { requiresUserAuth: true }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupModal,
    props: (route) => ({ type: route.query.t })
  },
  {
    path: '/signin',
    name: 'signin',
    component: SigninModal,
    props: (route) => ({ type: route.query.t }),
    meta: { reuse: false }
  },
  {
    path: '/profile',
    name: 'profile-modal',
    component: ProfileModal
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: About
  // },
  {
    path: '/signout',
    beforeEnter (to, from, next) {
      auth.signoutUser()
      next('/')
    }
  },
  {
    path: '/item',
    name: 'item',
    component: About,
    children: [
      {
        path: 'new',
        name: 'new-item',
        component: PostItemModal
      },
      {
        path: ':id',
        name: 'item-details',
        component: ItemDetailsModal
      }
    ]
  }
  // {
  //   path: '/item',
  //   name: 'item',
  //   component: PostItemModal
  // }
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
  // {
  //   path: '/success',
  //   name: 'success',
  //   component: Success,
  //   meta: { requiresUserAuth: true }
  // }
]
//   mode: 'history'
// })
