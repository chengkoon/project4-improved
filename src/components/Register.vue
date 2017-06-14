<template>
  <div>
    <h2 class="page-header">Register</h2>
    <form>
      <div class="form-group">
        <label>Name</label>
        <input type="text" v-model="name" name="name" class="form-control">
      </div>
      <div class="form-group">
        <label>Username</label>
        <input type="text" v-model="username" name="username" class="form-control">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" name="email" class="form-control" >
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="password" name="password" class="form-control">
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" @click="registerNewUser">
    </form>

  </div>

</template>

<script>

import axios from 'axios'

export default {
  name: 'register',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      name: '',
      email: '',
      username: '',
      password: ''
    }
  },
  methods: {
    registerNewUser () {
      event.preventDefault()
      axios.post('users/register', { name: this.name, email: this.email, username: this.username, password: this.password })
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
