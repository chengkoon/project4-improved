import axios from 'axios'

export default {

  user: {
    authenticated: false,
    username: ''
  },

  sponsor: {
    authenticated: false,
    username: '',
    test: ''
  },

  isDev: true, // change to false before deployment/production

  registerNewUser (signupCredentials, type, cb) {
    let vm = this
    let ep
    if (type === 'user') ep = this.prepEndpoint('user/register')
    else if (type === 'sponsor') ep = this.prepEndpoint('sponsor/register')
    console.log('ep is...', ep)
    axios.post(ep, { signupCredentials })
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

  signinUser (signinCredentials, type, cb) {
    let vm = this
    let ep
    if (type === 'user') ep = this.prepEndpoint('user/authenticate')
    else if (type === 'sponsor') ep = this.prepEndpoint('sponsor/authenticate')
    axios.post(ep, { signinCredentials })
    .then(function (response, err) {
      if (response.data.success) {
        window.localStorage.setItem('id_token', response.data.id_token)
        // vm.user.authenticated = true
        if (type === 'user') {
          window.localStorage.setItem('user', true)
          vm.user.authenticated = true
          vm.user.username = response.data.username
        } else if (type === 'sponsor') {
          window.localStorage.setItem('sponsor', true)
          vm.sponsor.authenticated = true
          vm.sponsor.username = response.data.username
        }

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
  isUserSignedIn () {
    return !!window.localStorage.getItem('id_token') && !!window.localStorage.getItem('user')
  },
  isSponsorSignedIn () {
    return !!window.localStorage.getItem('id_token') && !!window.localStorage.getItem('sponsor')
  },

  signoutUser () {
    window.localStorage.removeItem('id_token')
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('sponsor')
    this.user.authenticated = false
  },

  isLoggedIn () {
    let jwt = window.localStorage.getItem('id_token')
    if (jwt) return true
    else return false
  },

  getProfile () {
    let ep = this.prepEndpoint('user/profile')
    console.log('we are at client side getProfile()')
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
