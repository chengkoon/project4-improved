<template>
  <nav class="nav has-shadow" v-bind:class="{ 'nav-fixed-top': fixedBar }">
    <div class="container">
      <div class="nav-left">
        <a class="nav-item" href="/">
          <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo">
        </a>

        <router-link to="#tikam" tag="a" active-class="is-active" class="nav-item is-tab is-hidden-mobile" exact>Tikam!</router-link>
        <!-- <a href="#tikam" class="nav-item is-tab is-hidden-mobile is-active" exact>Tikam!</a> -->

        <router-link to="#how-it-works" tag="a" active-class="is-active" class="nav-item is-tab is-hidden-mobile" exact>How it works</router-link>
        <router-link to="#about-us" tag="a" active-class="is-active" class="nav-item is-tab is-hidden-mobile" exact>About us</router-link>
        <router-link to="#sponsor-us" tag="a" active-class="is-active" class="nav-item is-tab is-hidden-mobile" exact>Sponsor us!</router-link>
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
        <router-link to="/signup?t=user" tag="a" active-class="is-active" class="nav-item is-tab is-hidden-mobile" v-show="!userSignedIn && !sponsorSignedIn" exact>Sign up</router-link>
        <router-link to="/signin?t=user" tag="a" active-class="is-active" class="nav-item is-tab is-hidden-mobile" v-show="!userSignedIn && !sponsorSignedIn" exact>Sign in</router-link>
        <!-- when user is sign in -->
        <router-link to="/dashboard" active-class="active" exact><a class="nav-item is-tab" v-show="userSignedIn === true">Dashboard</a></router-link>
        <router-link to="/item/new" tag="a" active-class="is-active" class="nav-item is-tab is-hidden-mobile" v-show="sponsorSignedIn" exact>Post Item</router-link>
        <a class="nav-item is-tab" @click="signoutUser" v-show="userSignedIn || sponsorSignedIn">Sign out</a>
      </div>
    </div>
  </nav>
</template>

<script>

import auth from '../auth'
import { EventBus } from '../event-bus.js'

export default {
  name: 'navbar',
  props: ['type'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username: '',
      userSignedIn: false,
      sponsorSignedIn: false,
      fixedBar: false,
      isactive: {
        tikam: false
      }
    }
  },
  methods: {
    checkSponsorAuth () {
      if (!auth.sponsor.authenticated) return false
      else return true
    },
    showSignupModal () {
      EventBus.$emit('signup-modal', true)
    },
    showSigninModal () {
      EventBus.$emit('signin-modal', true)
    },
    showPostItemModal () {
      EventBus.$emit('post-item-modal', true)
    },
    signoutUser () {
      this.userSignedIn = false
      this.sponsorSignedIn = false
      EventBus.$emit('clear-form-data')
      EventBus.$emit('flash', 'Signed out successfully!')
      this.$router.push('/signout')
    },
    handleScroll () {
      console.log('current Y position', window.scrollY)
      if (window.scrollY > 49) {
        this.fixedBar = true
      } else {
        this.fixedBar = false
      }
    }
  },
  created () {
    console.log('navbar is reloaded')
    this.userSignedIn = auth.isUserSignedIn()
    this.sponsorSignedIn = auth.isSponsorSignedIn()
    EventBus.$on('user-signedInStatus', (status) => {
      this.userSignedIn = true
      this.username = auth.user.username
      console.log('this.userSignedIn and username are ', this.userSignedIn, this.username)
    })
    EventBus.$on('sponsor-signedInStatus', (status) => {
      this.sponsorSignedIn = true
      console.log('this.sponsorSignedIn is ', this.sponsorSignedIn)
    })
    window.addEventListener('scroll', this.handleScroll)
    console.log('navbar has been created and this.userSignedIn is ', this.userSignedIn)
    console.log('auth.sponsor.authenticated is ', auth.sponsor.authenticated)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-fixed-top {
  position: fixed;
  right: 0;
  left: 0;
  /*z-index: 1030;*/
}
/* ^ since bulma doesnt have a fixed navbar option
however this needs to be offset by a padding of the body */
</style>
