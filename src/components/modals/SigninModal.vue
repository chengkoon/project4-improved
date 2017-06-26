<template>
  <div class="signin-modal modal" :class="{ 'is-active': showThisModal }">
    <div class="modal-background" @click="showThisModal = false"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Sign in as {{userOrSponsor}}</p>
        <button class="delete" @click="closeThisModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Username</label>
          <p class="control has-icons-left has-icons-right">
            <input class="input is-success" type="text" v-model="signinCredentials.username">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fa fa-check"></i>
            </span>
          </p>
          <p class="help is-success">This username is available</p>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <p class="control has-icons-left has-icons-right">
            <input class="input is-success" type="password" v-model="signinCredentials.password">
            <span class="icon is-small is-left">
              <i class="fa fa-key"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fa fa-check"></i>
            </span>
          </p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <a class="button is-success" @click="signinUser">Sign in</a>
      </footer>
    </div>
  </div>
</template>

<script>

import auth from '../../auth'
import { EventBus } from '../../event-bus.js'

export default {
  name: 'signup-modal',
  data () {
    return {
      signinCredentials: {
        username: '',
        password: ''
      },
      showThisModal: false,
      userOrSponsor: '',
      showAutofocus: false
    }
  },
  methods: {
    signinUser () {
      event.preventDefault()
      auth.signinUser(this.signinCredentials, this.userOrSponsor, loggedIn => {
        if (!loggedIn) {
          // trigger shake animation instead of below
          this.$router.push('/user/login')
        } else {
          if (this.userOrSponsor === 'User') EventBus.$emit('user-signedInStatus', true)
          else if (this.userOrSponsor === 'Sponsor') EventBus.$emit('sponsor-signedInStatus', true)

          this.showThisModal = false
          EventBus.$emit('flash', 'Signed in successfully!')
          if (this.$route.query.hasOwnProperty('redirect')) this.$router.push('/' + this.$route.query.redirect)
          else this.$router.push('/')
        }
      })
    },
    closeThisModal () {
      this.showThisModal = false
      this.$router.push('/')
    }
  },
  created () {
    EventBus.$on('signin-modal', (status) => {
      this.userOrSponsor = 'User'
      this.showThisModal = status
    })
    EventBus.$on('sponsor-signin-modal', (status) => {
      this.userOrSponsor = 'Sponsor'
      this.showThisModal = status
    })
    EventBus.$on('clear-form-data', () => {
      this.signinCredentials.username = ''
      this.signinCredentials.password = ''
    })
  },
  beforeUpdate () {
    console.log('updated')
    this.showAutofocus = false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
