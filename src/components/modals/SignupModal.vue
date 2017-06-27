<template>
  <div class="signup-modal modal is-active">
    <div class="modal-background" @click="closeThisModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Sign up <span v-if="type === 'sponsor'">as a sponsor</span></p>
        <!-- <button class="delete" @click="showThisModal = false"></button> -->
      </header>
      <form id="signupForm">
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Username</label>
            <p class="control has-icons-left has-icons-right">
              <input class="input is-success" ref="usernameInput" type="text" placeholder="John" v-model="signupCredentials.username">
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
               v-model="signupCredentials.email">
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
              <input class="input is-success" type="password" v-model="signupCredentials.password">
              <span class="icon is-small is-left">
                <i class="fa fa-key"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fa fa-check"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <a class="button is-success is-small" @click="registerNewUser">Sign up</a>
            <a class="button is-small" @click="closeThisModal">Cancel</a>
          </div>
        </section>
        <footer class="modal-card-foot">
          <!-- <a class="button is-success" @click="registerNewUser">Sign up</a> -->
          <a @click="switchTo('signin')">sign in</a>&nbsp;|&nbsp;
          <a @click="switchTo('signup', true)" v-if="type === 'user'">sponsor mode</a>
          <a @click="switchTo('signup', true)" v-if="type === 'sponsor'">user mode</a>
        </footer>
      </form>
    </div>
  </div>

</template>

<script>

import auth from '../../auth'
import { EventBus } from '../../event-bus.js'

export default {
  name: 'signin-modal',
  props: ['type'],
  data () {
    return {
      signupCredentials: {
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
      auth.registerNewUser(this.signupCredentials, this.type, isAuthenticated => {
        if (!isAuthenticated) {
          // trigger shake animation instead of below
          this.$router.push('/signup?t=user')
        } else {
          if (this.type === 'user') EventBus.$emit('user-signedInStatus', true)
          else if (this.type === 'sponsor') EventBus.$emit('sponsor-signedInStatus', true)
          this.showThisModal = false
          this.$router.push('/')
        }
      })
    },
    closeThisModal () {
      this.showThisModal = false
      this.$router.push('/')
    },
    switchTo (route, switchMode) {
      this.showThisModal = false
      let switchType
      if (switchMode) this.type === 'user' ? switchType = 'sponsor' : switchType = 'user'
      else this.type === 'user' ? switchType = 'user' : switchType = 'sponsor'
      this.$router.push({path: `/${route}`, query: { t: switchType }})
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
      this.signupCredentials.username = ''
      this.signupCredentials.email = ''
      this.signupCredentials.password = ''
    })
  },
  mounted () {
    this.$refs.usernameInput.focus()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal {
  text-align: left;
}
.modal-card {
  width: 400px;
}
.modal-card-head {
  background-color: inherit;
  border-color: inherit;
  text-align: left;
  padding: 0;
  padding-bottom: 8px;
}
.modal-card-title {
  color: white;
}
.modal-card-body {
  border-radius: 4px;
}
form {
  background-color: rbga(0,0,0,0);
}
.button.is-small {
  font-size: 14px;
  margin-top: 8px;
  margin-right: 10px;
  margin-bottom: 2px;
}
footer {
  background-color: inherit;
  border-color: rgba(0,0,0,0);
  color: white;
  padding-top: 0;
  justify-content: center;
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
