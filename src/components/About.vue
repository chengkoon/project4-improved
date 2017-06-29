<template>
  <div class="about">
    about page2
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'about',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      parsedToken: ''
    }
  }
  // beforeMount () {
  //   let token = localStorage.getItem('id_token')
  //   var base64Url = token.split('.')[1]
  //   var base64 = base64Url.replace('-', '+').replace('_', '/')
  //   this.parsedToken = JSON.parse(window.atob(base64))
  // }
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
