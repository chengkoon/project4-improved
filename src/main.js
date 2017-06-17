// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import auth from './auth'
import VueRouter from 'vue-router'
import { routes } from './routes'

Vue.config.productionTip = false
// Vue.use(BootstrapVue)

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresUserAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.isLoggedIn()) {
      next({
        path: '/user/login',
        query: { redirect: to.name },
        props: { message: 'Please log in first!' }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
