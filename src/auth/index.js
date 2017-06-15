import router from '../router'
import axios from 'axios'

export default {

  user: {
    authenticated: false
  },

  isDev: true, // change to false before deployment/production

  registerNewUser (user) {
    let ep = this.prepEndpoint('users/register')
    axios.post(ep, { user })
  },

  loginUser (loginCredentials, redirect) {
    let vm = this
    let ep = this.prepEndpoint('users/authenticate')
    axios.post(ep, { loginCredentials: loginCredentials })
    .then(function (response, err) {
      if (!response.data.success) {
        router.push('/login')
      } else if (response.data.success) {
        localStorage.setItem('id_token', response.data.id_token)
        vm.user.authenticated = true
        if (redirect) router.push('/' + redirect)
        else router.push('/home')
      }
    })
  },

  logoutUser () {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
    router.push('/login')
  },

  isLoggedIn () {
    let jwt = localStorage.getItem('id_token')
    if (jwt) return true
    else return false
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

  prepEndpoint (ep) {
    if (this.isDev) {
      return 'http://localhost:3000/' + ep
    } else {
      return ep
    }
  },

  testtest () {
    let ep = this.prepEndpoint('users/haha')
    axios.get(ep)
    .then((response) => {
      console.log('we are at testtest and response.data is...', response.data)
      router.push('/success')
    })
  }
}
