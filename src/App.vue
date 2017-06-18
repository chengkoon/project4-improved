<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <nav-bar></nav-bar>
    <flash-message></flash-message>
    <signup-modal></signup-modal>
    <signin-modal></signin-modal>
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

export default {
  name: 'app',
  components: {
    'nav-bar': Navbar,
    'flash-message': flashmessage,
    'signup-modal': SignupModal,
    'signin-modal': SigninModal,
    'tikam': Tikam,
    'how-it-works': HowItWorks,
    'about-us': AboutUs,
    'sponsor-us': SponsorUs
  },
  data () {
    return {
    }
  }
  // created () {
  //   EventBus.$on('signup-modal', (status) => {
  //     this.userOrSponsor = 'User'
  //     this.showSignupModal = status
  //   })
  //   EventBus.$on('signin-modal', (status) => {
  //     this.userOrSponsor = 'User'
  //     this.showSigninModal = status
  //   })
  //   EventBus.$on('sponsor-signup-modal', (status) => {
  //     this.userOrSponsor = 'Sponsor'
  //     this.showSigninModal = status
  //   })
  //   EventBus.$on('sponsor-signin-modal', (status) => {
  //     this.userOrSponsor = 'Sponsor'
  //     this.showSigninModal = status
  //   })
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
