<template>
  <div>
    <h2 class="page-header">Register</h2>
    <form>
      <div class="form-group">
        <label>Name</label>
        <input type="text" v-model="user.name" name="name" class="form-control">
      </div>
      <div class="form-group">
        <label>Username2</label>
        <input type="text" v-model="user.username" name="username" class="form-control">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="user.email" name="email" class="form-control" >
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="user.password" name="password" class="form-control">
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" @click="registerNewUser">
    </form>

  </div>

</template>

<script>

import axios from 'axios'
import auth from '../auth'

export default {
  name: 'register',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user: {
        name: '',
        email: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    registerNewUser () {
      let vm = this
      event.preventDefault()
      console.log('new authenticate')
      // axios.post('users/register', { name: this.user.name, email: this.user.email, username: this.user.username, password: this.user.password })
      axios.post('users/register', { user: this.user })
      .then(function (response, err) {
        if (err) {
          vm.$router.push('/register')
        } else {
          vm.$router.push('/login')
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
