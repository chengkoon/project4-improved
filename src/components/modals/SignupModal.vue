<template>
  <div class="signup-modal modal" :class="{ 'is-active': showThisModal }">
    <div class="modal-background" @click="showThisModal = false"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Sign up as {{userOrSponsor}}</p>
        <button class="delete" @click="showThisModal = false"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Username</label>
          <p class="control has-icons-left has-icons-right">
            <input class="input is-success" type="text" placeholder="John"
             v-model="user.username">
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
          <label class="label">Email</label>
          <p class="control has-icons-left has-icons-right">
            <input class="input is-danger" type="text" placeholder="John@gmail.com"
             v-model="user.email">
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fa fa-warning"></i>
            </span>
          </p>
          <p class="help is-danger">This email is invalid</p>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <p class="control has-icons-left has-icons-right">
            <input class="input is-success" type="password" v-model="user.password">
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
        <a class="button is-success" @click="registerNewUser">Sign up</a>
      </footer>
    </div>
  </div>

</template>

<script>

import auth from '../../auth'
import { EventBus } from '../../event-bus.js'

export default {
  name: 'signin-modal',
  data () {
    return {
      user: {
        email: '',
        username: '',
        password: ''
      },
      showThisModal: false,
      userOrSponsor: ''
    }
  },
  methods: {
    registerNewUser () {
      event.preventDefault()
      auth.registerNewUser(this.user, this.userOrSponsor, isAuthenticated => {
        if (!isAuthenticated) {
          // trigger shake animation instead of below
          this.$router.push('/user/register')
        } else {
          EventBus.$emit('user-signedInStatus', true)
          this.showThisModal = false
          this.$router.push('/')
        }
      })
    }
  },
  created () {
    EventBus.$on('signup-modal', (status) => {
      this.userOrSponsor = 'User'
      this.showThisModal = status
    })
    EventBus.$on('sponsor-signup-modal', (status) => {
      this.userOrSponsor = 'Sponsor'
      this.showThisModal = status
    })
    EventBus.$on('clear-form-data', () => {
      this.user.username = ''
      this.user.email = ''
      this.user.password = ''
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
