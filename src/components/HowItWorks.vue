<template>
  <div class="how-it-works"> <!-- list of items -->
    <div class="big-box columns is-gapless">
      <div class="card column is-3 item-example">
        <div class="top-half-card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="" alt="">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="" alt="">
                </figure>
              </div>
              <div class="media-content">
                <p>Product Name</p>
                <p>@sponsor</p>
              </div>
            </div>
            <div class="content">
              Long Description Long Description Long Description Long Description Long Description Long Description Long Description Long Description
            </div>
          </div>
        </div><!-- /.top-half-card -->

        <div class="bottom-half-card">
          <div class="timing-details">

          </div>
          <!-- <footer class="level">
            <div class="level-left">

            </div>
          </footer> -->
        </div>
        <div class="fade"></div>
      </div>
      <div class="card column is-3 winner-example">
        <div class="card-content">
          <div class="top-half-card">
            <p>Winner is...</p>
            <i class="fa fa-trophy fa-5x gold"></i>
            <p><strong>James</strong> with a bid of <strong>$1.97</strong></p>
          </div>
          <div class="bottom-half-card">
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
              <tbody>
                <tr>
                  <th>$1.99</th>
                  <th>
                    <span data-balloon="Mary" data-balloon-pos="up"><i class="fa fa-circle"></i></span>
                    <span data-balloon="Daniel" data-balloon-pos="up"><i class="fa fa-circle"></i></span>
                    <span data-balloon="Julius" data-balloon-pos="up"><i class="fa fa-circle"></i></span>
                  </th>
                </tr>
                <tr>
                  <th>$1.98</th>
                  <th>
                    <span data-balloon="John" data-balloon-pos="up"><i class="fa fa-circle"></i></span>
                    <span data-balloon="Doe" data-balloon-pos="up"><i class="fa fa-circle"></i></span>
                  </th>
                </tr>
                <tr>
                  <th>$1.97</th>
                  <th>
                    <span data-balloon="John" data-balloon-pos="up"><i class="fa fa-circle gold"></i></span>
                  </th>
                </tr>
                <tr>
                  <th>$1.96</th>
                  <th>
                    <span data-balloon="Cheng" data-balloon-pos="up"><i class="fa fa-circle"></i></span>
                    <span data-balloon="Koon" data-balloon-pos="up"><i class="fa fa-circle"></i></span>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="description column is-3">
        <table class="table">
          <tr>
            <th>How It Works</th>
          </tr>
          <tr>
            <th>Sponsors post an item for bidding</th>
          </tr>
          <tr>
            <th>Users submit a (or multiple) bids</th>
          </tr>
          <tr>
            <th>ALL bids (regardless of outcome) will be donated to selected charity</th>
          </tr>
          <tr>
            <th>The user with the highest unique bid wins!</th>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

import { EventBus } from '../event-bus.js'
// import { directive as onClickaway } from 'vue-clickaway'
// import services from '../services'
const sr = require('scrollreveal')()

export default {
  name: 'how-it-works',
  props: ['something'],
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
    // console.log('sr is ', sr)
    sr.reveal('.item-example', { origin: 'left', duration: 1000, delay: 300 })
    sr.reveal('.winner-example', { origin: 'left', duration: 1000, delay: 600 })
    // sr.reveal('.bar')
    // TODO reword the HIW
    // TODO attach icons on the left
    // TODO on hover, zoom in effect of the left divs
  },
  updated () {
    console.log('howitworks is updated')
    EventBus.$emit('cards-updated')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*.how-it-works:before {
  display: block;
  content: " ";
  margin-top: -105px;
  height: 105px;
  visibility: hidden;
}*/
.how-it-works {
  height: 500px;
}
.big-box {
  height: 100%;
  border: 2px solid black;
  /*display: flex;*/
  justify-content: center;
  padding-top: 26px;
  padding-bottom: 26px;
}
.hiwCard {
  width: 200px;
  height: 50%;
  margin: 30px;
  border: 2px solid black;
}
div.fade {
  position: relative;
  top: -105%;
  left: 60%;

  display: block;

  width: 40%;
  height: 100%;

  background-image: linear-gradient(to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.9)
  100%);
}
div.winner-example {
  height: 90%;
  align-self: center;
  position: relative;
  left: -5%;
}
.gold {
  color: gold;
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
</style>
