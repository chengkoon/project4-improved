<template>
  <div class="success">
    success page
    User found is: {{ user }}
  </div>
</template>

<script>

import axios from 'axios'
import auth from '../auth'

export default {
  name: 'success',
  data () {
    return {
      thing: '',
      user: ''
    }
  },
  beforeMount () {
    axios.get('users/profile', { headers: auth.getAuthHeader() })
    .then((response) => {
      console.log('we have successfully get request from profile')
      this.user = response.data.user
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
