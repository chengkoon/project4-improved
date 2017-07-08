<template>
  <div class="how-it-works"> <!-- list of items -->
    <div class="big-box">
      <div class="hiwCard div1 foo"></div>
      <div class="hiwCard div2 animated slideInUp"></div>
      <div class="hiwCard div3 animated slideInUp"></div>
    </div>
  </div>
</template>

<script>

import { EventBus } from '../event-bus.js'
// import { directive as onClickaway } from 'vue-clickaway'
// import services from '../services'
// const sr = require('scrollreveal')()

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
    // sr.reveal('.foo')
    // sr.reveal('.bar')
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
  display: flex;
  justify-content: space-around;
}
.hiwCard {
  width: 200px;
  height: 50%;
  margin: 30px;
  border: 2px solid black;
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
