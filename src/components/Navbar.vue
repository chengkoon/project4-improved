<template>
  <nav class="nav has-shadow" v-bind:class="{ 'nav-fixed-top': fixedBar }">
    <div class="container">
      <div class="nav-left">
        <a class="nav-item" href="/">
          <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo">
        </a>
        <router-link to="#tikam" tag="a" active-class="is-active" class="nav-item is-tab is-hidden-mobile" :class="{ 'is-active': isactive.tikam }" exact>Tikam!</router-link>
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
        <a class="nav-item is-tab" @click="showSignupModal" v-show="!type">Sign up</a>
        <a class="nav-item is-tab" @click="showSigninModal" v-show="!type">Sign in</a>
        <!-- when user is sign in -->
        <router-link to="/dashboard" active-class="active" exact><a class="nav-item is-tab" v-show="type === 'User'">Dashboard</a></router-link>
        <!-- <router-link to="/item/" active-class="active" exact><a class="nav-item is-tab" v-show="userSignedIn">Dashboard</a></router-link> -->
        <a class="nav-item is-tab" @click="showPostItemModal" v-show="type === 'Sponsor'">Post Item</a>
        <a class="nav-item is-tab" @click="signoutUser" v-show="type">Sign out</a>
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
      userSignedIn: false,
      username: '',
      sponsorSignedIn: false,
      fixedBar: false,
      isactive: {
        tikam: false
      }
    }
  },
  methods: {
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
    // if (auth.user.authenticated) {
    //   this.userSignedIn = true
    //   this.username = auth.user.username
    // } else if (auth.sponsor.authenticated) {
    //   this.sponsorSignedIn = true
    //   this.username = auth.sponsor.username
    // }
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
