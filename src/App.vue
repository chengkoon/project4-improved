<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <nav-bar :type='typeOfUser' :activeTab='activeTab'></nav-bar>
    <router-view :animationTypeReceived="propToBePassed"></router-view>
    <flash-message></flash-message>
    <!-- <signup-modal></signup-modal> -->
    <!-- <signin-modal></signin-modal> -->
    <!-- <post-item-modal></post-item-modal> -->
    <!-- <item-details-modal></item-details-modal> -->
    <!-- <router-view></router-view> -->

    <tikam id="tikam"></tikam>
    <how-it-works id="how-it-works" :something="something"></how-it-works>
    <about-us id="about-us"></about-us>
    <!-- <sponsor-us id="sponsor-us"></sponsor-us> -->
  </div>
</template>

<script>

import { EventBus } from './event-bus.js'
import Navbar from './components/Navbar.vue'
import Tikam from './components/Tikam.vue'
import HowItWorks from './components/HowItWorks.vue'
import AboutUs from './components/AboutUs.vue'
// import SponsorUs from './components/SponsorUs.vue'
import flashmessage from './components/flashmessage.vue'
// import SignupModal from './components/modals/SignupModal.vue'
// import SigninModal from './components/modals/SigninModal.vue'
// import PostItemModal from './components/modals/PostItemModal.vue'
// import ItemDetailsModal from './components/modals/ItemDetailsModal.vue'

export default {
  name: 'app',
  components: {
    'nav-bar': Navbar,
    'flash-message': flashmessage,
    // 'signup-modal': SignupModal,
    // 'signin-modal': SigninModal,
    // 'post-item-modal': PostItemModal,
    // 'item-details-modal': ItemDetailsModal,
    'tikam': Tikam,
    'how-it-works': HowItWorks,
    'about-us': AboutUs
    // 'sponsor-us': SponsorUs
  },
  data () {
    return {
      scrollPosition: '',
      prevScrollPosition: '',
      typeOfUser: '',
      propToBePassed: '',
      // fixedBar: false,
      navBarHeight: '',
      activeTab: '',
      tikamPos: '',
      howItWorksPos: '',
      aboutUsPos: '',
      something: false
    }
  },
  watch: {
    // call again the method if the route changes
    '$route.hash': 'fetchData',
    '$route' (to, from) {
      console.log('to is ', to.query['t'])
      console.log('from is ', from.query['t'])
      if ((from.path === '/') && (to.path === '/signup' || '/signin')) {
        console.log(1111111)
        this.propToBePassed = 'slideInDown'
      } else if ((to.path === '/signup' || '/signin') && (from.path === '/signup' || '/signin')) {
        console.log(3333333)
        this.propToBePassed = 'pulse'
      }
    }
  },
  methods: {
    // onScroll: function (e, position) {
    //   this.position = position
    // },
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
    },
    updateScrollProp () {
      this.scrollPosition = window.scrollY
      this.navBarHeight = document.getElementById('navbar').offsetHeight
      this.tikamPos = document.getElementById('tikam').offsetTop - this.navBarHeight
      this.howItWorksPos = document.getElementById('how-it-works').offsetTop - this.navBarHeight
      this.aboutUsPos = document.getElementById('about-us').offsetTop - this.navBarHeight
      console.log('current scroll position', this.scrollPosition)
      console.log('tikamPos ', this.tikamPos)
      console.log('howItWorksPos ', this.howItWorksPos)
      console.log('aboutUsPos ', this.aboutUsPos)
    },
    handleScroll () {
      this.scrollPosition = window.scrollY
      // this.tikamPos = document.getElementById('tikam').offsetTop
      // this.howItWorksPos = document.getElementById('how-it-works').offsetTop
      // this.aboutUsPos = document.getElementById('about-us').offsetTop
      console.log('current scroll position', this.scrollPosition)
      // console.log('tikamPos ', this.tikamPos)
      // console.log('howItWorksPos ', this.howItWorksPos)
      // console.log('aboutUsPos ', this.aboutUsPos)
      // if (this.scrollPosition > 49) {
      //   this.fixedBar = true
      // } else if (this.scrollPosition <= 49) {
      //   this.fixedBar = false
      // }
      if (this.scrollPosition > this.prevScrollPosition) { // scrolling down
        if ((this.scrollPosition >= this.tikamPos) && (this.scrollPosition < this.howItWorksPos)) {
          // this.$router.replace('/#tikam')
          this.activeTab = 1
        }
        if ((this.scrollPosition >= this.howItWorksPos) && (this.scrollPosition < this.aboutUsPos)) {
          // this.$router.replace('/#how-it-works')
          this.activeTab = 2
          this.something = true
        }
        if (this.scrollPosition > this.aboutUsPos) {
          // this.$router.replace('/#about-us')
          this.activeTab = 3
        }
      }
      // this.prevScrollPosition = this.scrollPosition
      // console.log('prev scroll pos is ', this.prevScrollPosition)
    }
  },
  created () {
    console.log('app.vue has been created')
    window.addEventListener('scroll', this.handleScroll)
    this.typeOfUser = this.parseJwt()
    // this.tikamPos = document.getElementById('tikam').offsetTop
    // this.howItWorksPos = document.getElementById('how-it-works').offsetTop
    // this.aboutUsPos = document.getElementById('about-us').offsetTop
    EventBus.$on('cards-updated', () => {
      console.log('received cards updated emission')
      this.updateScrollProp()
    })
    EventBus.$on('goToTikam', () => {
      window.scrollTo(0, this.tikamPos)
      this.activeTab = 1
    })
    EventBus.$on('goToHowItWorks', () => {
      window.scrollTo(0, this.howItWorksPos)
      this.activeTab = 2
      this.something = true
    })
    EventBus.$on('goToAboutUs', () => {
      window.scrollTo(0, this.aboutUsPos)
      this.activeTab = 3
    })
  },
  updated () {
    console.log('change sensed in app.vue')
  }
  // mounted () {
  //   this.scrollPosition = window.scrollY
  //   this.tikamPos = document.getElementById('tikam').offsetTop
  //   this.howItWorksPos = document.getElementById('how-it-works').offsetTop
  //   this.aboutUsPos = document.getElementById('about-us').offsetTop
  //   console.log('current scroll position', this.scrollPosition)
  //   console.log('tikamPos ', this.tikamPos)
  //   console.log('howItWorksPos ', this.howItWorksPos)
  //   console.log('aboutUsPos ', this.aboutUsPos)
  // }
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
