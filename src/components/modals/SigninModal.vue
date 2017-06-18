<template>
  <div class="signin-modal modal" :class="{ 'is-active': showThisModal }">
    <div class="modal-background" @click="showThisModal = false"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Sign in as {{userOrSponsor}}</p>
        <button class="delete" @click="showThisModal = false"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Username</label>
          <p class="control has-icons-left has-icons-right">
            <input class="input is-success" type="text" v-model="loginCredentials.username">
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
            <input class="input is-success" type="password" v-model="loginCredentials.password">
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
      loginCredentials: {
        username: '',
        password: ''
      },
      showThisModal: false,
      userOrSponsor: ''
    }
  },
  methods: {
    signinUser () {
      event.preventDefault()
      auth.signinUser(this.loginCredentials, loggedIn => {
        if (!loggedIn) {
          // trigger shake animation instead of below
          this.$router.push('/user/login')
        } else {
          EventBus.$emit('user-signedInStatus', true)
          this.showThisModal = false
          this.$router.replace('/' + this.$route.query.redirect || '/')
        }
      })
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
      this.loginCredentials.username = ''
      this.loginCredentials.password = ''
    })
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
