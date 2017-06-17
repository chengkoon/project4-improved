<template>
  <div class="signup-modal modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Sign Up</p>
      <button class="delete" @click="hideModal"></button>
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
      }
    }
  },
  methods: {
    registerNewUser () {
      event.preventDefault()
      auth.registerNewUser(this.user, isAuthenticated => {
        if (!isAuthenticated) {
          // trigger shake animation instead of below
          this.$router.push('/user/register')
        } else {
          // emit event to eventBus
          // EventBus.$emit('user-status', 'registered')
          this.hideModal()
          EventBus.$emit('user-signedInStatus', true)
          this.$router.push('/')
        }
      })
    },
    hideModal () {
      EventBus.$emit('signup-modal', false)
      EventBus.$emit('any-modal-on-screen', false)
    }
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
