<template>
  <div class="show-winner-modal modal is-active">
    <div class="modal-background" @click="closeThisModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Winner is...</p>
        <button class="delete" @click="closeThisModal"></button>
      </header>
      <section class="modal-card-body">
        <i class="fa fa-trophy fa-5x"></i>
        <div>
          <strong>{{winner.winner}}</strong> won with a bid of ${{winner.winningBid}}!
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Bidder(s)</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>Amount</th>
              <th>Bidder(s)</th>
            </tr>
          </tfoot>
          <!-- <tbody> -->
            <transition-group
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-bind:css="false"
            tag="tbody"
            >
              <tr v-for="(bid, index) in orderedBidsArray" :key="index">
                <th>${{bid[0]}}</th>
                <th>
                  <span v-for="bidder in bid[1]" :data-balloon="bidder" data-balloon-pos="up">
                  <i class="fa fa-circle"
                  :class="{'gold': checkWinner(bid[0], bidder)}">
                  </i>
                  </span>
                </th>
              </tr>
            </transition-group>
          <!-- </tbody> -->
        </table>
      </section>
    </div>
  </div>
</template>

<script>
import services from '../../services'
// const sr = require('scrollreveal')()
const Velocity = require('velocity-animate')

export default {
  name: 'show-winner-modal',
  data () {
    return {
      winner: {},
      allBids: [],
      orderedBidsArray: [],
      currentInterval: 0,
      winnerIconDisplayed: false
    }
  },
  methods: {
    closeThisModal () {
      this.$router.push('/')
    },
    checkWinner (bid, bidder) {
      if ((bid === this.winner.winningBid) && (bidder === this.winner.winner)) {
        this.winnerIconDisplayed = true
        return true
      } else {
        return false
      }
    },
    interval () {
      this.currentInterval = this.currentInterval + 800
      return this.currentInterval
    },
    beforeEnter: function (el) {
      el.style.opacity = 0
    },
    enter: function (el, done) {
      Velocity(el, { opacity: 1 }, { delay: this.interval() }, { duration: 500 })
    }
  },
  created () {
    services.getWinnerDetails(this.$route.params.id)
    .then(res => {
      console.log('client side getWinner is ', res)
      this.winner = res
    })
    services.getAllBidsDetails(this.$route.params.id)
    .then(res => {
      console.log('client side allBids is ', res)
      // this.allBids = res
      // console.log('res.allBids is ', res.allBids)
      let currentCounterForBidAmount = 1.99
      while (currentCounterForBidAmount >= 1.00) {
        if (res.allBids[currentCounterForBidAmount]) {
          this.orderedBidsArray.push([currentCounterForBidAmount, res.allBids[currentCounterForBidAmount]])
        }
        currentCounterForBidAmount = currentCounterForBidAmount - 0.01
      }
      console.log('orderedBidsArray', this.orderedBidsArray)
    })
    // TODO animation for ^?
  }
}
</script>

<style lang="css">
.modal {
  text-align: left;
}
.modal-card {
  width: 400px;
}
.modal-card-head {
  background-color: inherit;
  border-color: inherit;
  text-align: left;
  padding: 0;
  padding-bottom: 8px;
}
.modal-card-title {
  color: white;
}
.modal-card-body {
  border-radius: 4px;
  text-align: center;
}
i.fa-trophy {
  color: gold;
}
i.fa-circle {
  margin: 2px;
}
i.gold {
  color: gold;
}
</style>
