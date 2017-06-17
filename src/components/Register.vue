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

// import axios from 'axios'
import auth from '../auth'
import { EventBus } from '../event-bus.js'

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
      event.preventDefault()
      auth.registerNewUser(this.user, isAuthenticated => {
        if (!isAuthenticated) {
          this.$router.push('/user/register') // replace with some local error msg
        } else {
          // emit event to eventBus
          EventBus.$emit('user-status', 'registered')
          this.$router.push('/user/login')
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
