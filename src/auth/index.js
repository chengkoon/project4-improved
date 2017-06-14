import {router} from '../router/index'

export default {
  user: {
    authenticated: false
  },
  registerNewUser () {
    event.preventDefault()
    axios.post('users/register', { name: this.name, email: this.email, username: this.username, password: this.password })
  }
}
