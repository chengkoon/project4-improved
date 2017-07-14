<template>
  <div id="navbar" class="nav-wrapper">
  <nav class="nav has-shadow nav-fixed-top">
    <div class="container">
      <div class="nav-left">
        <a class="nav-item" href="/">
          <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo">
        </a>

        <!-- <router-link to="#tikam" tag="a" active-class="is-active" class="nav-item is-tab is-hidden-mobile" exact>Tikam!</router-link> -->
        <a class="nav-item is-tab is-hidden-mobile" :class="{'active-tab': isTikamActive}" @click="goTo('Tikam')">Tikam!</a>
        <a class="nav-item is-tab is-hidden-mobile" :class="{'active-tab': isHowItWorksActive}" @click="goTo('HowItWorks')">How it works</a>
        <a class="nav-item is-tab is-hidden-mobile" :class="{'active-tab': isAboutUsActive}" @click="goTo('AboutUs')">About Us</a>

        <!-- <router-link to="#how-it-works" tag="a" active-class="is-active" class="nav-item is-tab is-hidden-mobile" exact>How it works</router-link> -->
        <!-- <router-link to="#about-us" tag="a" active-class="is-active" class="nav-item is-tab is-hidden-mobile" exact>About us</router-link> -->
        <!-- <router-link to="#sponsor-us" tag="a" active-class="is-active" class="nav-item is-tab is-hidden-mobile" exact>Sponsor us!</router-link> -->
        <!-- <a class="nav-item is-tab is-hidden-mobile">How it works</a> -->
        <!-- <a class="nav-item is-tab is-hidden-mobile">About us</a> -->
      </div>
      <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div class="nav-right nav-menu">
        <a class="nav-item is-tab is-hidden-tablet is-active">Home</a>
        <a class="nav-item is-tab is-hidden-tablet">Features</a>
        <a class="nav-item is-tab is-hidden-tablet">Pricing</a>
        <a class="nav-item is-tab is-hidden-tablet">About</a>
        <!-- <a class="nav-item is-tab">
          <figure class="image is-16x16" style="margin-right: 8px;">
            <img src="http://bulma.io/images/jgthms.png">
          </figure>
          Profile
        </a> -->
        <router-link to="/signup?t=user" tag="a" active-class="is-active" class="nav-item is-tab is-hidden-mobile" v-show="!typeSaved" exact>Sign up</router-link>
        <router-link to="/signin?t=user" tag="a" active-class="is-active" class="nav-item is-tab is-hidden-mobile" v-show="!typeSaved" exact>Sign in</router-link>
        <!-- when user/sponsor is sign in -->
        <router-link to="/profile" tag="a" active-class="is-active" class="nav-item is-tab is-hidden-mobile" v-show="typeSaved === 'Sponsor'" exact>
          <figure class="image is-16x16" style="margin-right: 8px;">
            <img src="http://bulma.io/images/jgthms.png">
          </figure>
          Profile
        </router-link>
        <router-link to="/item/new" tag="a" active-class="is-active" class="nav-item is-tab is-hidden-mobile" v-show="typeSaved === 'Sponsor'" exact>Post Item</router-link>
        <a class="nav-item is-tab" @click="signoutUser" v-show="typeSaved">Sign out</a>
      </div>
    </div>
  </nav>
</div>
</template>

<script>

import auth from '../auth'
import { EventBus } from '../event-bus.js'

export default {
  name: 'navbar',
  props: ['type', 'activeTab'], // 'type' is from App.vue and determines if user/sponsor is signed in
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      // username: '',
      // userSignedIn: false,
      // sponsorSignedIn: false,
      isactive: {
        tikam: false
      },
      typeSaved: ''
      // scrollPosition: '',
      // prevScrollPosition: '',
      // navBarHeight: '',
      // tikamPos: '',
      // howItWorksPos: '',
      // aboutUsPos: ''
    }
  },
  computed: {
    isTikamActive () {
      return this.activeTab === 1
    },
    isHowItWorksActive () {
      return this.activeTab === 2
    },
    isAboutUsActive () {
      return this.activeTab === 3
    }
  },
  methods: {
    checkSponsorAuth () {
      if (!auth.sponsor.authenticated) return false
      else return true
    },
    signoutUser () {
      EventBus.$emit('flash', 'Signed out successfully!')
      EventBus.$emit('signout')
      this.$router.push('/signout')
    },
    goTo (location) {
      EventBus.$emit(`goTo${location}`)
    }
  },
  created () {
    console.log('navbar is reloaded')
    window.addEventListener('scroll', this.handleScroll)
    this.typeSaved = this.type
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-wrapper {
  position: relative;
  height: 52px;
  display: block;
}
.nav-fixed-top {
  position: fixed;
  /*right: 0;*/
  /*left: 0;*/
  top: 0;
  width: 100%;
  /*height: 100%;
  width: 100%;*/
  /*background-color: grey;*/
  /*color: white;*/
  /*z-index: 1030;*/
}
a.active-tab {
  border-bottom: 3px solid #00d1b2;
  color: #00d1b2;
  padding-bottom: calc(.75rem - 3px);
}
/* ^ since bulma doesnt have a fixed navbar option
however this needs to be offset by a padding of the body */
</style>
