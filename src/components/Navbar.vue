<template>
  <!-- <div class="bye"> -->
  <!-- Static navbar -->
    <!-- <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link to="/" active-class="active" exact><a class="navbar-brand">Tikam for Charity</a></router-link>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <router-link to="/" tag="li" active-class="active" exact><a>Tikam!</a></router-link>
            <router-link to="/about" tag="li" active-class="active" exact><a>How it works</a></router-link>
            <router-link to="/about" tag="li" active-class="active" exact><a>About us</a></router-link>


          </ul>
          <ul class="nav navbar-nav navbar-right">
            <router-link to="/user/register" tag="li" active-class="active" exact><a>Register/Log in</a></router-link>
            <router-link to="/sponsors" tag="li" active-class="active" exact><a>For Sponsors</a></router-link>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Hi, Cheng <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#">Profile</a></li>
                <li><a href="#">Dashboard</a></li>
                <router-link to="/user/logout" tag="li" active-class="active" exact><a>Logout</a></router-link>
                <li role="separator" class="divider"></li>
                <li class="dropdown-header">Nav header</li>
                <li><a href="#">Separated link</a></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav> -->
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item">
            <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo">
          </a>
          <a class="nav-item is-tab is-hidden-mobile is-active">Tikam!</a>
          <a class="nav-item is-tab is-hidden-mobile">How it works</a>
          <a class="nav-item is-tab is-hidden-mobile">About us</a>
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
          <a class="nav-item is-tab" @click="showSignupModal" v-show="!userSignedIn">Sign up</a>
          <a class="nav-item is-tab" @click="showSigninModal" v-show="!userSignedIn">Sign in</a>
          <a class="nav-item is-tab" v-show="!userSignedIn">For Sponsors</a>
          <!-- when user is sign in -->
          <router-link to="/dashboard" active-class="active" exact><a class="nav-item is-tab" v-show="userSignedIn">Dashboard</a></router-link>
          <a class="nav-item is-tab" @click="signoutUser" v-show="userSignedIn">Sign out</a>
        </div>
      </div>
    </nav>
  <!-- </div> -->
</template>

<script>

// import auth from '../auth'
import { EventBus } from '../event-bus.js'

export default {
  name: 'navbar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      anyModalOnScreen: false,
      userSignedIn: false,
      username: ''
    }
  },
  methods: {
    showSignupModal () {
      if (!this.anyModalOnScreen) {
        this.anyModalOnScreen = true
        EventBus.$emit('signup-modal', true)
      }
    },
    showSigninModal () {
      if (!this.anyModalOnScreen) {
        this.anyModalOnScreen = true
        EventBus.$emit('signin-modal', true)
      }
    },
    signoutUser () {
      this.userSignedIn = false
      this.$router.push('/signout')
    }
  },
  created () {
    EventBus.$on('any-modal-on-screen', (status) => {
      this.anyModalOnScreen = status
    })
    EventBus.$on('user-signedInStatus', (status) => {
      this.userSignedIn = true
    })
  },
  watch: {
    userSignedIn: function () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
