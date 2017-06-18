<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <nav-bar></nav-bar>
    <flash-message></flash-message>
    <signup-modal v-show="showSignupModal"></signup-modal>
    <signin-modal v-show="showSigninModal"></signin-modal>
    <!-- <router-view></router-view> -->
    <tikam id="tikam"></tikam>
    <how-it-works id="how-it-works"></how-it-works>
  </div>
</template>

<script>

import { EventBus } from './event-bus.js'
import Navbar from './components/Navbar.vue'
import Tikam from './components/Tikam.vue'
import HowItWorks from './components/HowItWorks.vue'
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
    'how-it-works': HowItWorks
  },
  data () {
    return {
      showSignupModal: false,
      showSigninModal: false
    }
  },
  created () {
    EventBus.$on('signup-modal', (status) => {
      this.showSignupModal = status
    })
    EventBus.$on('signin-modal', (status) => {
      this.showSigninModal = status
    })
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
