<template>
  <div class="home">
    home page
  </div>
</template>

<script>

import axios from 'axios'
import auth from '../auth'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      thing: ''
    }
  },
  beforeMount () {
    console.log('before mount')
    axios.get('users/haha')
    .then((response) => {
      console.log('we have successfully get request from hahahaha')
      this.thing = response.data
    })
    .then((response) => {
      console.log('second then')
      auth.testtest()
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
