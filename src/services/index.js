import axios from 'axios'

export default {

  getElem () {
    var map = document.getElementById('map')
    console.log('map is ...', map)
  },

  isDev: false, // change to false before deployment/production

  createItem (itemDetails) {
    let ep = this.prepEndpoint('items/create')
    console.log('inside createItem at client side')
    return axios.post(ep, { itemDetails: itemDetails }, { headers: this.getAuthHeader() })
    .then(res => { // including res.data.err if present
      console.log('we are at then bracket')
      return res.data
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

  getItem (itemId) {
    let ep = this.prepEndpoint('item/' + itemId)
    return axios.get(ep)
    .then(res => {
      return res.data.item
    }).catch(err => {
      console.log('getItemDetail err is...', err)
    })
  },

  submitBid (itemId, bidAmount) {
    let tempEp = 'item/' + itemId + '/bid'
    let ep = this.prepEndpoint(tempEp)
    return axios.post(ep, { bidAmount: bidAmount }, { headers: this.getAuthHeader() })
    .then(res => {
      return res.data
    }).catch(err => {
      console.log('submitBid err is...', err)
    })
  },

  getWinnerDetails (itemId) {
    let ep = this.prepEndpoint('item/winner/' + itemId)
    return axios.get(ep, itemId)
    .then(res => {
      return res.data
    })
  },

  getAllBidsDetails (itemId) {
    let ep = this.prepEndpoint('item/bids/' + itemId)
    return axios.get(ep)
    .then(res => {
      return res.data
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
