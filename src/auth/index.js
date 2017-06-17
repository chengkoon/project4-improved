import axios from 'axios'

export default {

  user: {
    authenticated: false
  },

  isDev: true, // change to false before deployment/production

  registerNewUser (user, cb) {
    let ep = this.prepEndpoint('user/register')
    axios.post(ep, { user })
    .then(function (response, err) {
      if (response.data.success) {
        if (cb) cb(true)
        return
      } else {
        if (cb) cb(false)
      }
    })
  },

  loginUser (loginCredentials, cb) {
    let vm = this
    let ep = this.prepEndpoint('user/authenticate')
    axios.post(ep, { loginCredentials: loginCredentials })
    .then(function (response, err) {
      if (response.data.success) {
        window.localStorage.setItem('id_token', response.data.id_token)
        vm.user.authenticated = true
        if (cb) cb(true)
        return
      } else {
        if (cb) cb(false)
      }
    })
  },

  loggedIn () {
    return !!window.localStorage.getItem('id_token')
  },

  logoutUser () {
    window.localStorage.removeItem('id_token')
    this.user.authenticated = false
    // this.$router.push('/user/login')
  },

  isLoggedIn () {
    let jwt = window.localStorage.getItem('id_token')
    if (jwt) return true
    else return false
  },

  getProfile () {
    let ep = this.prepEndpoint('user/profile')
    return axios.get(ep, { headers: this.getAuthHeader() })
    .then((response) => {
      console.log('we have successfully get request from profile')
      console.log('response.data is ', response.data.user)
      return response.data.user
    })
  },

  checkAuth () {
    let jwt = window.localStorage.getItem('id_token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  getAuthHeader () {
    return {
      'Authorization': window.localStorage.getItem('id_token')
    }
  },

  prepEndpoint (ep) {
    if (this.isDev) {
      return 'http://localhost:3000/' + ep
    } else {
      return ep
    }
  }
}
