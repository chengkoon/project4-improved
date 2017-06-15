<template>
  <div class="login">
    <h2 class="page-header">Log In</h2>
    <form>
      <div class="form-group">
        <label>Username</label>
        <input type="text" v-model="loginCredentials.username" name="username" class="form-control">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="loginCredentials.password" name="password" class="form-control">
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" @click="authenticateUser">
    </form>

  </div>
</template>

<script>

// import axios from 'axios'
import auth from '../auth'

export default {
  name: 'login',
  data () {
    return {
      loginCredentials: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    authenticateUser () {
      event.preventDefault()
      auth.loginUser(this.loginCredentials)
      // axios.post('users/authenticate', { username: this.username, password: this.password })
      // .then(function (response, err) {
      //   if (!response.data.success) {
      //     vm.$router.push('/login')
      //   } else if (response.data.success) {
      //     vm.$router.push('/success')
      //   }
      // })
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
