import router from '../router'
import axios from 'axios'

export default {

  user: {
    authenticated: false
  },

  registerNewUser (user) {
    axios.post('users/register', { user })
  },

  loginUser (loginCredentials) {
    let vm = this
    axios.post('users/authenticate', { loginCredentials: loginCredentials })
    .then(function (response, err) {
      if (!response.data.success) {
        router.push('/login')
      } else if (response.data.success) {
        localStorage.setItem('id_token', response.data.id_token)
        vm.user.authenticated = true
        router.push('/success')
      }
    })
  },

  logoutUser () {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
    router.push('/login')
  },

  checkAuth () {
    let jwt = localStorage.getItem('id_token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  getAuthHeader () {
    return {
      'Authorization': localStorage.getItem('id_token')
    }
  },

  testtest () {
    axios.get('users/haha')
    .then((response) => {
      console.log('we are at testtest and response.data is...', response.data)
      router.push('/success')
    })
  }
}
