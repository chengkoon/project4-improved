<template>
  <div class="user-modal">
    <signup-modal v-show="showSignupModal"></signup-modal>
    <signin-modal v-show="showSigninModal"></signin-modal>
  </div>
</template>

<script>

import { EventBus } from '../../event-bus.js'
import SigninModal from './SigninModal.vue'
import SignupModal from './SignupModal.vue'

export default {
  name: 'user-modal',
  components: {
    'signin-modal': SigninModal,
    'signup-modal': SignupModal
  },
  data () {
    return {
      showSignupModal: false,
      showSigninModal: false
    }
  },
  created () {
    EventBus.$on('signup-modal', (status) => {
      this.showSignupModal = status
    })
    EventBus.$on('signin-modal', (status) => {
      this.showSigninModal = status
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
