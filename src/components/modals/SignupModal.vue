<template>
  <div class="signup-modal modal is-active" tabindex="0" @keyup.esc="closeThisModal">
    <div class="modal-background" @click="closeThisModal"></div>
    <!-- <transition name="slide"> -->
      <div class="modal-card animated" :class="animationType">
        <header class="modal-card-head">
          <p class="modal-card-title">Sign up <span v-if="type === 'sponsor'">as a sponsor</span></p>
          <!-- <button class="delete" @click="showThisModal = false"></button> -->
        </header>
        <form id="signupForm">
          <section class="modal-card-body">
            <div class="field">
              <label class="label"><span v-if="type === 'user'">Username</span><span v-if="type === 'sponsor'">Company name</span></label>
              <p class="control has-icons-left has-icons-right">
                <input name="username" ref="username" :class="{'input': true, 'is-danger': vErrors.has('username'), 'is-success': !vErrors.has('username')}" type="text" placeholder="john91" v-model="signupCredentials.username">
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

            <!-- Company Logo Upload -->
            <!-- <form enctype="multipart/form-data" id="logoForm" @change="uploadImg($event.target)" novalidate v-if="(type === 'sponsor') && (isInitial || isSaving || isImageMounted)" action="http://localhost:3000/newLogo" method="POST"> -->
            <div class="field media" v-if="type === 'sponsor'">
              <div class="media-left">
                <label class="label">Company Logo<span data-balloon-length="large" data-balloon="Please note 48x48 would be the exact size of the logo display. Also avoid logos with white background." data-balloon-pos="up"><i class="fa fa-info-circle"></i></span><br>
                  <span v-if="isInitial">(click to upload)</span>
                  Status:
                  <span v-if="isSaving">uploading...</span>
                  <span v-if="isSuccess">uploaded!</span>
                </label>
              </div>
              <div class="media-right">
                <form enctype="multipart/form-data" id="logoForm" @change="uploadImg($event.target)" novalidate v-if="(type === 'sponsor') && (isInitial || isSaving || isImageMounted)" action="http://localhost:3000/newLogo" method="POST">
                  <div class="dropbox" v-if="isInitial || isSaving || isImageMounted">
                    <input type="file" name="myFile"
                    :disabled="isSaving"
                    accept="image/*" class="input-file">
                  </div>
                </form>
                <figure class="image is-48x48" v-if="isSuccess">
                  <img :src="signupCredentials.logoURL" alt="">
                </figure>
              </div>
            </div>
            <!-- </form> -->

            <div class="field" v-if="type === 'sponsor'">
              <label class="label">Company URL (optional)</label>
              <p class="control has-icons-left">
                <input name="companyURL" class="input" type="text" placeholder="www.sony.com.sg" v-model="signupCredentials.companyURL">
                <span class="icon is-small is-left">
                  <i class="fa fa-link"></i>
                </span>
              </p>
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
                <input name="password" :class="{'input': true, 'is-danger': vErrors.has('password'), 'is-success': !vErrors.has('password')}" type="password" v-model="signupCredentials.password" @keyup.enter="signupUser">
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
    <!-- </transition> -->
  </div>

</template>

<script>

import auth from '../../auth'
import { EventBus } from '../../event-bus.js'
import { Validator } from 'vee-validate'
import axios from 'axios'
import _ from 'lodash'

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3
const STATUS_IMAGE_MOUNTED = 4

export default {
  name: 'signup-modal',
  validator: null,
  props: ['type', 'animationTypeReceived'],
  data () {
    return {
      signupCredentials: {
        email: '',
        logoURL: '',
        companyURL: '',
        username: '',
        password: ''
      },
      vErrors: null,
      currentStatus: null
    }
  },
  computed: {
    animationType () {
      return this.animationTypeReceived
    },
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isImageMounted () {
      return this.currentStatus === STATUS_IMAGE_MOUNTED
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    }
  },
  methods: {
    reset () {
      this.currentStatus = STATUS_INITIAL
      this.uploadError = null
    },
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
    uploadImg (eventTarget) {
      this.currentStatus = STATUS_SAVING

      const formData = new FormData()
      formData.append(eventTarget.name, eventTarget.files[0], eventTarget.files[0].name)
      // axios.post('http://localhost:3000/item/newLogo', formData, { headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
      axios.post('item/newLogo', formData, { headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
      .then(res => {
        this.signupCredentials.logoURL = res.data.url
        this.currentStatus = STATUS_SUCCESS
      }).catch(err => {
        console.log('err is ', err)
        this.currentStatus = STATUS_FAILED
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
    // EventBus.$on('clear-form-data', () => {
    //   this.signupCredentials.username = ''
    //   this.signupCredentials.email = ''
    //   this.signupCredentials.password = ''
    // })
    this.validator = new Validator({
      username: 'required|alpha_num',
      email: 'required|email',
      password: 'required|min:8'
    })
    this.$set(this, 'vErrors', this.validator.errorBag)
    console.log('signup is created')
  },
  mounted () {
    this.$refs.username.focus()
    this.reset()
    console.log('signup is mounted')
    console.log('animationType is ', this.animationType)
  },
  watch: {
    '$route.query': function () { // this is needed as mounted does not sense when user clicks to switch mode
      this.$refs.username.focus()
      console.log('signup query watcher activated')
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

.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  height: 48px; /* minimum height */
  width: 48px;
  position: relative;
  cursor: pointer;
}
.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 48px;
  position: absolute;
  top: 0px;
  left: 0px;
  cursor: pointer;
  z-index: 900;
}
.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}
/*figure.image {
  border: 1px solid black;
}*/

/* animation for modal slide-in */
.slide-enter {
  opacity: 0;
  transform: translateY(-100%);
}
.slide-enter-to {
  opacity: 1;
  transform: translateY(0%);
}
.slide-enter-active {
  transition: all 1s ease;
}

</style>
