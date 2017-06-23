<template>
  <div class="modal item-details-modal" :class="{ 'is-active': showThisModal }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Product: {{item.name}}</p>
        <button class="delete" @click="showThisModal=!showThisModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="content">
          <div class="card-image">
            <img :src="item.imgURL" :alt="item.name">
          </div>
          <div class="card-content">
            <article class="message is-primary">
              <div class="message-body">
                {{item.description}}
              </div>
            </article>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <!-- <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input" :class="checkValidBidOutline" type="text" placeholder="1.00 to 1.99" v-model="bidAmount">
            <span class="icon is-left">
              <i class="fa fa-dollar"></i>
            </span>
            <span class="icon is-right">
              <i class="fa" :class="checkValidBidIcon"></i>
            </span>
          </p>
          <p class="help is-danger" v-show="!checkValidBid">Please bid an amount between $1.00 to $1.99, inclusive.</p>
        </div> -->

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Bid Amount:</label>
          </div>
          <div class="field-body">
            <div class="field is-grouped">
              <p class="control is-expanded has-icons-left has-icons-right">
                <input class="input" :class="checkValidBidOutline" type="text" placeholder="1.00 to 1.99" v-model="bidAmount">
                <span class="icon is-small is-left">
                  <i class="fa fa-dollar"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fa" :class="checkValidBidIcon"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <!-- <p class="control is-expanded has-icons-left has-icons-right">
                <input class="input is-success" type="email" placeholder="Email" value="alex@smith.com">
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fa fa-check"></i>
                </span>
              </p>
              <p class="help is-success">This email is correct</p> -->
              <a class="button is-focused" @click="submitBid(item._id)">Submit Bid!</a>
            </div>
          </div>
        </div>


      </footer>
    </div>
</div>
</template>

<script>

import { EventBus } from '../../event-bus.js'
import services from '../../services'

export default {
  name: 'item-details-modal',
  data () {
    return {
      showThisModal: false,
      item: {},
      bidAmount: ''
    }
  },
  computed: {
    checkValidBidOutline () {
      return {
        'is-danger': this.bidAmount >= 2 || this.bidAmount < 1,
        'is-primary': this.bidAmount < 2 && this.bidAmount >= 1
      }
    },
    checkValidBidIcon () {
      return {
        'fa-times': this.bidAmount >= 2 || this.bidAmount < 1,
        'fa-check': this.bidAmount < 2 && this.bidAmount >= 1
      }
    },
    checkValidBid () {
      if (this.bidAmount >= 2 || this.bidAmount < 1) return false
      else return true
    }
  },
  methods: {
    submitBid (itemId) {
      services.submitBid(itemId, this.bidAmount)
    }
  },
  created () {
    EventBus.$on('item-details-modal', (itemId) => {
      this.showThisModal = true
      services.getItemDetail(itemId).then(item => {
        this.item = item
        console.log('this.item is ...', this.item)
      })
    })
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

footer>div.field {
  align-items: center;
  /*justify-content: center;*/
}
div.field-label {
  text-align: left;
}
</style>
