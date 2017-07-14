<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <nav-bar :type='profileData.type' :activeTab='activeTab'></nav-bar>
    <router-view :animationTypeReceived="propToBePassed" :sponsor-details="profileData"></router-view>
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
import auth from './auth'

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
      propToBePassed: '',
      // fixedBar: false,
      navBarHeight: '',
      activeTab: '',
      tikamPos: '',
      howItWorksPos: '',
      aboutUsPos: '',
      something: false,
      profileData: {}
    }
  },
  watch: {
    // call again the method if the route changes
    '$route' (to, from) {
      this.fetchProfileData()
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
    fetchProfileData () {
      if (auth.parseTokenForType()) { // to ensure only getProfile when user/sponsor is signed in
        let type = auth.parseTokenForType()
        auth.getProfile(type).then((profileData) => {
          this.profileData = profileData
        })
      } else { // user/sponsor not signed in
        this.profileData.type = false
      }
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
      console.log('current scroll position', this.scrollPosition)
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
    this.fetchProfileData()
    window.addEventListener('scroll', this.handleScroll)
    EventBus.$on('signout', () => {
      this.profileData.type = false
    })
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
