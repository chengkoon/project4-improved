<template>
  <div class="signin-modal modal is-active" tabindex="0" @keyup.esc="closeThisModal">
    <div class="modal-background" @click="closeThisModal"></div>
    <!-- <transition :name="animationType" :enter-active-class="enterClass" :leave-active-class="leaveClass" mode="out-in"> -->
    <div class="modal-card animated" :class="animationType">
      <header class="modal-card-head">
        <p class="modal-card-title">Sign in <span v-if="type === 'sponsor'">as a sponsor</span></p>
        <!-- <button class="delete" @click="closeThisModal"></button> -->
      </header>
      <form id="signinForm">
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Username</label>
            <p class="control has-icons-left has-icons-right">
              <input type="text" ref="usernameInput" class="input is-success" v-model="signinCredentials.username">
              <span class="icon is-small is-left">
                <i class="fa fa-user"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fa fa-check"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <p class="control has-icons-left has-icons-right">
              <input class="input is-success" type="password" v-model="signinCredentials.password" @keyup.enter="signinUser">
              <span class="icon is-small is-left">
                <i class="fa fa-key"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fa fa-check"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <button type="button" class="button is-success is-small" @click="signinUser">Sign in</button>
            <button type="button" class="button is-small" @click="closeThisModal">Cancel</button>
          </div>
        </section>
        <footer class="modal-card-foot">
          <a @click="switchTo('signup')">sign up</a>&nbsp;|&nbsp;
          <a @click="switchTo('signin', true)" v-if="type === 'user'">sponsor mode</a>
          <a @click="switchTo('signin', true)" v-if="type === 'sponsor'">user mode</a>
        </footer>
      </form>
    </div>
  <!-- </transition> -->
  </div>
</template>

<script>

import auth from '../../auth'
import { EventBus } from '../../event-bus.js'

export default {
  name: 'signup-modal',
  props: ['type', 'animationTypeReceived'],
  data () {
    return {
      signinCredentials: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signinUser () {
      event.preventDefault()
      auth.signinUser(this.signinCredentials, this.type, loggedIn => {
        console.log('we are in client side signinUser')
        // this.animationType = ''
        if (!loggedIn) {
          EventBus.$emit('flash-failure', 'Signin failed - either username or password incorrect')
          this.$router.push('/signin?t=user')
        } else {
          this.animationType = 'fadeOutUp'
          console.log('this.animationType is ', this.animationType)
          if (this.type === 'user') EventBus.$emit('user-signedInStatus', true)
          else if (this.type === 'sponsor') EventBus.$emit('sponsor-signedInStatus', true)
          // this.showThisModal = false
          EventBus.$emit('flash', 'Signed in successfully!')
          if (this.$route.query.hasOwnProperty('redirect')) this.$router.push(`/${this.$route.query.redirect}`)
          else this.$router.push('/')
        }
      })
    },
    closeThisModal () {
      this.$router.push('/')
    },
    switchTo (route, switchMode) {
      // this.showThisModal = false
      let switchType
      if (switchMode) this.type === 'user' ? switchType = 'sponsor' : switchType = 'user'
      else this.type === 'user' ? switchType = 'user' : switchType = 'sponsor'
      this.$router.push({path: `/${route}`, query: { t: switchType }})
    }
  },
  created () {
    // EventBus.$on('clear-form-data', () => {
    //   this.signinCredentials.username = ''
    //   this.signinCredentials.password = ''
    // })
    console.log('signin is created')
    this.animationType = this.animationTypeReceived
  },
  mounted () {
    this.$refs.usernameInput.focus() // this also enables the keyup.esc to work right off the bat
    console.log('signin is mounted')
  },
  watch: {
    '$route.query': function () { // this is needed as mounted does not sense when user clicks to switch mode
      this.$refs.usernameInput.focus()
    }
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
