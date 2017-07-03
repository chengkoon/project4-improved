<template>

  <!-- <div class="alert alert-warning alert-dismissible" role="alert" v-if="show">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true" @click="show = !show">&times;</span></button>
    <span class="message"><strong>Hey!</strong> User is {{ message }}</span>
  </div> -->
  <transition :name="flashTransition">
    <div class="notification" :class="{'closeThisMsg': buttonClicked, 'is-primary': success, 'is-danger': failure}" v-if="show" @mouseover="resetTimer">
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
      message: '',
      flashTransition: 'fade',
      show: false,
      flashTimer: '',
      buttonClicked: false,
      success: false,
      failure: false
    }
  },
  methods: {
    resetTimer () {
      console.log('flash msg hovered over')
      if (!this.buttonClicked) {
        clearTimeout(this.flashTimer)
        this.flashTransition = 'snap'
        this.show = true
        this.flashTimer = setTimeout(() => {
          this.buttonClicked = false
          this.show = false
        }, 3500)
      }
    },
    closeFlash () {
      console.log('hahahaha3')
      this.buttonClicked = true // will trigger the display: none styling
      clearTimeout(this.flashTimer)
      this.flashTimer = setTimeout(() => {
        this.buttonClicked = false
        this.show = false
      }, 100)
    }
  },
  created () {
    EventBus.$on('flash', message => {
      this.success = true
      this.flashTransition = 'fade'
      this.show = true
      this.message = message
      this.flashTimer = setTimeout(() => {
        this.buttonClicked = false
        this.show = false
      }, 3500)
    })
    EventBus.$on('flash-failure', message => {
      this.failure = true
      this.flashTransition = 'fade'
      this.show = true
      this.message = message
      this.flashTimer = setTimeout(() => {
        this.buttonClicked = false
        this.show = false
      }, 3500)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notification {
  max-width: 100%;
  /*overflow: hidden;*/
  white-space: nowrap;
  margin: 0 auto;
  text-align: left;
  position: fixed;
  opacity: 0.9;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
.closeThisMsg {
  display: none;
}

.fade-enter {
  opacity: 0.2;
}
.fade-enter-to {
  opacity: 0.9;
}
.fade-enter-active {
  transition: opacity 0.5s ease;
}
.fade-leave {
   opacity: 0.9;
}
.fade-leave-to {
   opacity: 0;
}
.fade-leave-active {
  transition: opacity 3s ease;
}

.snap-enter {
  opacity: 0.9;
}
.snap-enter-active {
  transition: opacity 0.1s;
}
.snap-leave {
   opacity: 0.9;
}
.snap-leave-active {
  transition: opacity 3s ease;
  opacity: 0;
}

</style>
