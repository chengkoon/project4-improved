<template>
  <div class="tikam"> <!-- list of items -->
    <button type="button" @click="testGetProfile">test</button>
    <div class="columns is-10">
      <div class="card column is-one-quarter" v-for="item in items">
        <div class="card-image">
          <figure class="image is-4by3">
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
              <a :href="item.productURL"><p class="title is-4">{{item.name}}</p></a>
              <p class="subtitle is-6">@johnsmith</p>
            </div>
          </div>

          <div class="content">
            {{item.description}}
          </div>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">
            <span>
              Donations go to {{item.receipientCharity}}
            </span>
          </p>
          <p class="card-footer-item">
            <span>
              <a @click="showItemDetails(item._id)">Bid Now!</a>
            </span>
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>

import { EventBus } from '../event-bus.js'
// import { directive as onClickaway } from 'vue-clickaway'
import services from '../services'
// import axios from 'axios'

export default {
  name: 'tikam',
  components: {
  },
  data () {
    return {
      myheight: '',
      user: 'hehe',
      items: {}
    }
  },
  methods: {
    testGetProfile () {
      services.getItems().then(items => {
        this.items = items
        console.log('this.items are...', this.items)
      })
    },
    showItemDetails (itemId) {
      EventBus.$emit('item-details-modal', itemId)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tikam:before {
  display: block;
  content: " ";
  margin-top: -285px;
  height: 285px;
  visibility: hidden;
}
.big-box {
  height: 1000px;
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
