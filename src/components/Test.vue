<template>
  <div class="test-modal modal is-active">
    <div class="modal-background" @click="showThisModal = false"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Sign in</p>
      </header>
      <button type="button" name="button" @click="makeFocus">make focus</button>
      <form id="userSigninForm">
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Username</label>
            <button class="delete" @click="closeThisModal"></button>
            <p class="control has-icons-left has-icons-right">
              <input type="text" ref="usernameInput" class="input is-success" v-model="signinCredentials.username">
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
      </form>
    </div>
  </div>
</template>

<script>

import auth from '../auth'
import { EventBus } from '../event-bus.js'

export default {
  name: 'test-modal',
  data () {
    return {
      signinCredentials: {
        username: '',
        password: ''
      },
      showThisModal: true,
      userOrSponsor: '',
      showAutofocus: false,
      userSigninForm: false
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
    },
    makeFocus () {
      this.$refs.usernameInput.focus()
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
  destroyed () {
    console.log('destroyed')
  },
  beforeMounted () {
    this.showAutofocus = true
  },
  mounted () {
    console.log('mounted')
    this.$refs.usernameInput.focus()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test {
  position: fixed;
}
.big-box {
  height: 500px;
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
