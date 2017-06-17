<template>
  <div class="index">
    <user-modal></user-modal>
    Index page. Call to action. How-to. Item gallery.
  </div>
</template>

<script>

import UserModal from './modals/UserModal.vue'

export default {
  name: 'index',
  components: {
    'user-modal': UserModal
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      thing: ''
    }
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
