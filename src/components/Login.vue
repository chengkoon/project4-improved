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
      <input type="submit" class="btn btn-primary" value="Submit" @click="loginUser">
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
    loginUser () {
      event.preventDefault()
      auth.loginUser(this.loginCredentials, loggedIn => {
        if (!loggedIn) {
          this.$router.push('/user/login') // replace with a data change to reflect error
        } else {
          // if (this.$router.hasOwnProperty('query')) {
          //   let redirect = this.$router.query.redirect
          //   this.$router.push('/' + redirect)
          //   // { name: 'userhome', params: { name: response.data.user.name } }
          // } else {
          //   this.$router.push('/home')
          // }
          this.$router.replace('/' + this.$route.query.redirect || '/home')
        }
      })
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
