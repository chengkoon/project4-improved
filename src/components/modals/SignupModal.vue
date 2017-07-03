<template>
  <div class="signup-modal modal is-active" tabindex="0" @keyup.esc="closeThisModal">
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
              <input name="username" :class="{'input': true, 'is-danger': vErrors.has('username'), 'is-success': !vErrors.has('username')}" type="text" placeholder="john91" v-model="signupCredentials.username">
              <span class="icon is-small is-left">
                <i class="fa fa-user"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fa fa-check" v-show="!vErrors.has('username')"></i>
                <i class="fa fa-warning" v-show="vErrors.has('username')"></i>
              </span>
            </p>
            <p class="help is-danger" v-show="vErrors.has('username')">Only alphanumeric characters allowed for username</p>
          </div>

          <div class="field">
            <label class="label">Email</label>
            <p class="control has-icons-left has-icons-right">
              <!-- <input type="text" placeholder="John@gmail.com" v-model="signupCredentials.email" name="email"> -->
              <input type="text" name="email" :class="{'input': true, 'is-danger': vErrors.has('email'), 'is-success': !vErrors.has('email')}" placeholder="john@gmail.com" v-model="signupCredentials.email">
              <span class="icon is-small is-left">
                <i class="fa fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fa fa-check" v-show="!vErrors.has('email')"></i>
                <i class="fa fa-warning" v-show="vErrors.has('email')"></i>
              </span>
            </p>
            <p class="help is-danger" v-show="vErrors.has('email')">This email is invalid</p>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <p class="control has-icons-left has-icons-right">
              <input name="password" :class="{'input': true, 'is-danger': vErrors.has('password'), 'is-success': !vErrors.has('password')}" type="password" v-model="signupCredentials.password" @keyup.enter="signinUser">
              <span class="icon is-small is-left">
                <i class="fa fa-key"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fa fa-check" v-show="!vErrors.has('password')"></i>
                <i class="fa fa-warning" v-show="vErrors.has('password')"></i>
              </span>
            </p>
            <p class="help is-danger" v-show="vErrors.has('password')">Your password is too short (at least 8 characters)</p>
          </div>
          <div class="field">
            <button type="button" class="button is-success is-small" @click="signupUser">Sign up</button>
            <button type="button" class="button is-small" @click="closeThisModal">Cancel</button>
          </div>
        </section>
        <footer class="modal-card-foot">
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
import { Validator } from 'vee-validate'
import _ from 'lodash'

export default {
  name: 'signup-modal',
  validator: null,
  props: ['type'],
  data () {
    return {
      signupCredentials: {
        email: '',
        username: '',
        password: ''
      },
      vErrors: null
    }
  },
  methods: {
    signupUser () {
      event.preventDefault()
      auth.registerNewUser(this.signupCredentials, this.type, isAuthenticated => {
        if (!isAuthenticated) {
          // trigger shake animation instead of below
          EventBus.$emit('flash-failure', 'Signup failed - either username or email has been taken')
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
      this.$router.push('/')
    },
    switchTo (route, switchMode) {
      this.showThisModal = false
      let switchType
      if (switchMode) this.type === 'user' ? switchType = 'sponsor' : switchType = 'user'
      else this.type === 'user' ? switchType = 'user' : switchType = 'sponsor'
      this.$router.push({path: `/${route}`, query: { t: switchType }})
    },
    validateField: _.debounce(
      function (field, val) {
        this.validator.validate(field, val)
      },
      800
    )
  },
  created () {
    EventBus.$on('clear-form-data', () => {
      this.signupCredentials.username = ''
      this.signupCredentials.email = ''
      this.signupCredentials.password = ''
    })
    this.validator = new Validator({
      username: 'required|alpha_num',
      email: 'required|email',
      password: 'required|min:8'
    })
    this.$set(this, 'vErrors', this.validator.errorBag)
  },
  mounted () {
    // this.$refs.username.focus()
    console.log('signup is mounted')
  },
  watch: {
    '$route.query': function () { // this is needed as mounted does not sense when user clicks to switch mode
      // this.$refs.username.focus()
    },
    'signupCredentials.username' (val) {
      // this.validator.validate('username', val)
      this.validateField('username', val)
    },
    'signupCredentials.email': function (val) {
      this.validateField('email', val)
    },
    'signupCredentials.password': function (val) {
      this.validateField('password', val)
    }
    // email(value) {
    //   this.validator.validate('email', value);
    // },
    // name(value) {
    //   this.validator.validate('name', value);
    // }
  },
  destroyed () {
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
