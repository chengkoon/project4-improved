<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <nav-bar :type='typeOfUser'></nav-bar>
    <flash-message></flash-message>
    <signup-modal></signup-modal>
    <signin-modal></signin-modal>
    <post-item-modal></post-item-modal>
    <!-- <router-view></router-view> -->

    <tikam id="tikam"></tikam>
    <how-it-works id="how-it-works"></how-it-works>
    <about-us id="about-us"></about-us>
    <sponsor-us id="sponsor-us"></sponsor-us>
  </div>
</template>

<script>

// import { EventBus } from './event-bus.js'
import Navbar from './components/Navbar.vue'
import Tikam from './components/Tikam.vue'
import HowItWorks from './components/HowItWorks.vue'
import AboutUs from './components/AboutUs.vue'
import SponsorUs from './components/SponsorUs.vue'
import flashmessage from './components/flashmessage.vue'
import SignupModal from './components/modals/SignupModal.vue'
import SigninModal from './components/modals/SigninModal.vue'
import PostItemModal from './components/modals/PostItemModal.vue'

export default {
  name: 'app',
  components: {
    'nav-bar': Navbar,
    'flash-message': flashmessage,
    'signup-modal': SignupModal,
    'signin-modal': SigninModal,
    'post-item-modal': PostItemModal,
    'tikam': Tikam,
    'how-it-works': HowItWorks,
    'about-us': AboutUs,
    'sponsor-us': SponsorUs
  },
  data () {
    return {
      position: {
        scrollTop: 0,
        scrollLeft: 0
      },
      typeOfUser: ''
    }
  },
  watch: {
    // call again the method if the route changes
    '$route.hash': 'fetchData'
  },
  methods: {
    onScroll: function (e, position) {
      this.position = position
    },
    fetchData () {
      console.log('yes watcher on route.hash change is activated')
      console.log('$route.hash is...', this.$route.hash)
      if (this.$route.hash === '#tikam') {
        // refresh getItems again
      }
      this.typeOfUser = this.parseJwt()
    },
    parseJwt () {
      console.log('parsing token...')
      let token = window.localStorage.getItem('id_token')
      if (!token) return false
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace('-', '+').replace('_', '/')
      let parsedToken = JSON.parse(window.atob(base64))
      return parsedToken.type
    }
  },
  created () {
    console.log('app.vue has been created')
    this.typeOfUser = this.parseJwt()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
