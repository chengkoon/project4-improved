<template>
  <div class="success">
    success page
    User found is: {{ user }}
  </div>
</template>

<script>

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
    auth.getProfile().then((user) => {
      this.user = user
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
