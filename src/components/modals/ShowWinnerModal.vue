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
      </section>
    </div>
  </div>
</template>

<script>
import services from '../../services'
export default {
  name: 'show-winner-modal',
  data () {
    return {
      winner: {},
      allBids: []
    }
  },
  methods: {
    closeThisModal () {
      this.$router.push('/')
    }
  },
  created () {
    services.getWinnerDetails(this.$route.params.id)
    .then(res => {
      console.log('client side getWinner is ', res)
    })
    services.getAllBidsDetails(this.$route.params.id)
    .then(res => {
      console.log('client side allBids is ', res)
    })
    // TODO change Bid model to include bidder's name directly
    // TODO ensure showWinner moodal displays correct winner and all bids
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
</style>
