<template>

  <div class="alert alert-warning alert-dismissible" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <span class="message"><strong>Hey!</strong> User is {{ message }}</span>
  </div>

</template>

<script>

import { EventBus } from '../event-bus.js'

export default {
  name: 'flashmessage',
  // props: ['message'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      message: ''
    }
  },
  methods: {
  },
  created () {
    EventBus.$on('user-status', message => {
      this.message = message
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alert {
  max-width: 50%;
  margin: 0 auto;
  text-align: left;
}
</style>
