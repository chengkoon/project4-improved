<template>

  <!-- <div class="alert alert-warning alert-dismissible" role="alert" v-if="show">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true" @click="show = !show">&times;</span></button>
    <span class="message"><strong>Hey!</strong> User is {{ message }}</span>
  </div> -->
  <transition name="fade">
    <div class="notification is-primary" v-if="show">
      <button class="delete" @click="show = !show"></button>
      {{message}}
    </div>
  </transition>
</template>

<script>

import { EventBus } from '../event-bus.js'

export default {
  name: 'flashmessage',
  // props: ['message'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      message: '',
      show: false
    }
  },
  methods: {
  },
  created () {
    EventBus.$on('user-status', message => {
      this.message = message
    })
    EventBus.$on('flash', message => {
      this.show = true
      this.message = message
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notification {
  max-width: 50%;
  margin: 0 auto;
  text-align: left;
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 1s;
}
.fade-leave {
  /* opacity: 1; */
}
.fade-leave-active {
  transition: opacity 1s;
  opacity: 0;
}
</style>
