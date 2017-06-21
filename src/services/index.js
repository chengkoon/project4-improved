import axios from 'axios'

export default {

  isDev: true, // change to false before deployment/production

  createItem (itemDetails, cb) {
    let ep = this.prepEndpoint('items/create')
    console.log('inside createItem at client side')
    axios.post(ep, { itemDetails: itemDetails }, { headers: this.getAuthHeader() })
    .then(res => {
      console.log('res is...', res)
    }).catch(err => {
      console.log('err is...', err)
    })
  },

  getItems () {
    let ep = this.prepEndpoint('items')
    console.log('inside getItems - client')
    return axios.get(ep)
    .then(res => {
      console.log('res is ...', res.data.items)
      return res.data.items
    }).catch(err => {
      console.log('err is ...', err)
    })
  },

  getItemDetail (itemId) {
    let ep = this.prepEndpoint('item/' + itemId)
    return axios.get(ep)
    .then(res => {
      return res.data.item
    }).catch(err => {
      console.log('getItemDetail err is...', err)
    })
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
