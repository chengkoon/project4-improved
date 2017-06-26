<template>

  <!-- <div class="alert alert-warning alert-dismissible" role="alert" v-if="show">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true" @click="show = !show">&times;</span></button>
    <span class="message"><strong>Hey!</strong> User is {{ message }}</span>
  </div> -->
  <transition :name="flashTransition" :duration="{ enter: 500, leave: 800 }">
    <div class="notification is-primary" v-if="show" @mouseover="resetTimer">
      <button class="delete" @click="closeFlash"></button>
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
      flashTransition: 'fade',
      show: false,
      flashTimer: '',
      buttonClicked: false
    }
  },
  methods: {
    resetTimer () {
      if (!this.buttonClicked) {
        clearTimeout(this.flashTimer)
        this.flashTransition = 'snap'
        this.show = true
        this.flashTimer = setTimeout(() => {
          this.show = false
        }, 3500)
      }
    },
    closeFlash () {
      this.show = false
      this.buttonClicked = true
    }
  },
  created () {
    EventBus.$on('user-status', message => {
      this.message = message
    })
    EventBus.$on('flash', message => {
      this.flashTransition = 'fade'
      this.show = true
      this.message = message
      this.flashTimer = setTimeout(() => {
        this.show = false
      }, 3500)
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
  opacity: 0.9;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
.fade-enter {
  opacity: 0.2;
}
.fade-enter-to {
  opacity: 0.9;
}
.fade-enter-active {
  transition: opacity 2.5s ease;
}
.fade-leave {
   opacity: 0.9;
}
.fade-leave-to {
   opacity: 0.1;
}
.fade-leave-active {
  transition: opacity 3s ease;
}

.snap-enter {
  opacity: 1;
}
.snap-enter-active {
  transition: opacity 0.1s;
}
.snap-leave {
   opacity: 1;
}
.snap-leave-active {
  transition: opacity 2s;
  opacity: 0.1;
}
</style>
