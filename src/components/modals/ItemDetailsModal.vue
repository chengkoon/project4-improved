<template>
  <div class="modal item-details-modal is-active">
    <div class="modal-background" @click="closeThisModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Product: {{item.name}}</p>
        <button class="delete" @click="closeThisModal"></button>
      </header>
      <!-- <section class="modal-card-body">
        <div class="content">
          <div class="card-image">
            <img :src="item.imgURL" :alt="item.name">
          </div>
          <div class="card-content">
            <article class="message is-primary">
              <div class="message-body description">
                {{item.description}}
              </div>
            </article>
          </div>
          <div class="card-content">
            <div class="content sponsor-details">
              Item is sponsored by {{item.sponsor}} <br>
              and all bids will be donated to {{item.receipientCharity}}
            </div>
          </div>
        </div>
      </section> -->
      <section class="card modal-card-body">
        <div class="card-image">
          <figure class="image is-square">
            <img :src="item.imgURL" alt="Image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="http://bulma.io/images/placeholders/96x96.png" alt="Image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">Company Name</p>
              <p class="subtitle is-6">Company URL</p>
            </div>
          </div>

          <div class="content description">
            {{item.description}}
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
            <label class="label">Amount:</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="help is-danger" v-show="vErrors.has('bidAmount')">Please bid between $1 and $1.99 (inclusive)</p>
              <p class="control is-expanded has-icons-left has-icons-right">
                <input name="bidAmount" class="input" :class="{'is-danger': vErrors.has('bidAmount'), 'is-success': !vErrors.has('bidAmount')}" type="text" placeholder="1.00 to 1.99" v-model="bidAmount">
                <span class="icon is-small is-left">
                  <i class="fa fa-dollar"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fa fa-check" v-show="!vErrors.has('bidAmount')"></i>
                  <i class="fa fa-warning" v-show="vErrors.has('bidAmount')"></i>
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
              <a class="button" @click="submitBid(item._id)">Donate!</a>
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
import { Validator } from 'vee-validate'
import _ from 'lodash'

export default {
  name: 'item-details-modal',
  data () {
    return {
      // showThisModal: false,
      item: {},
      bidAmount: '',
      vErrors: null
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
      if ((this.bidAmount < 2) && (this.bidAmount >= 1)) {
        services.submitBid(itemId, this.bidAmount)
        .then(res => {
          EventBus.$emit('flash', res.msg)
          this.$router.push('/')
        })
      } else {
        EventBus.$emit('flash-failure', 'Unable to place bid')
        this.$router.push('/')
      }
    },
    closeThisModal () {
      this.$router.push('/')
    },
    validateField: _.debounce(
      function (field, val) {
        this.validator.validate(field, val)
      },
      800
    )
  },
  created () {
    services.getItem(this.$route.params.id)
    .then(item => {
      this.item = item
    }).catch(err => {
      console.log('caughted error from services.getItem is ', err)
    })
    this.validator = new Validator({
      bidAmount: 'required|min_value:1|max_value:1.99'
    })
    this.$set(this, 'vErrors', this.validator.errorBag)
  },
  watch: {
    'bidAmount' (val) {
      this.validateField('bidAmount', val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.description {
  width: 100%;
  word-wrap: break-word;
  display: inline-block;
  text-align: left;
}
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
