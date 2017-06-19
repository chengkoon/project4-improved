<template>
  <div class="sponsor-us">
    If you like to sponsor the items (and gain some free marketing as an aside) click here to sign up for a sponsor account
    or click here to sign in into your sponsor account!
    <!-- <signup-modal v-show="showSignupModal"></signup-modal>
    <signin-modal v-show="showSigninModal"></signin-modal> -->
    <div class="big-box">
      <a class="button is-primary is-outlined" @click="sponsorSignUp">Sign up as a sponsor</a>
      <a class="button is-primary is-outlined" @click="sponsorSignIn">Sign in as a sponsor</a>
    </div>
  </div>
</template>

<script>

import { EventBus } from '../event-bus.js'

export default {
  name: 'sponsor-us',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    sponsorSignUp () {
      EventBus.$emit('sponsor-signup-modal', true)
    },
    sponsorSignIn () {
      EventBus.$emit('sponsor-signin-modal', true)
    }
  },
  created () {
    // EventBus.$on('any-modal-on-screen', (status) => {
    //   this.anyModalOnScreen = status
    // })
  },
  mounted () {
    this.myheight = this.$el.offsetHeight
    console.log('hihihi', this.$el.scrollTop)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sponsor-us:before {
  display: block;
  content: " ";
  margin-top: -105px;
  height: 105px;
  visibility: hidden;
}
.big-box {
  height: 1000px;
  border: 2px solid black;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
