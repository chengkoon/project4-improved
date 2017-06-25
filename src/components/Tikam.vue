<template>
  <div class="tikam"> <!-- list of items -->
    <div class="columns">
      <div class="field column is-4">
        <p class="control has-icons-left">
          <input class="input" type="text" v-model="searchTerm" placeholder="Do an instant search here">
          <span class="icon is-small is-left">
            <i class="fa fa-search"></i>
          </span>
        </p>
      </div>
    </div>
    <div class="columns is-10">
      <div class="card column is-one-quarter" v-for="item in filteredList">
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
              <!-- <a :href="item.productURL"><p class="title is-4">{{item.name}}</p></a> -->
              <a :href="item.productURL"><p class="title is-4"><span v-html="highlight(item.name)"></span></p></a>
              <p class="subtitle is-6">@johnsmith</p>
              <!-- <span v-html="rawHTML"></span> -->
            </div>
          </div>

          <div class="content">
            <span v-html="highlight(item.description)"></span>
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
            <span>
              <a @click="determineWinner(item._id)">determine winner</a>
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
import axios from 'axios'

export default {
  name: 'tikam',
  components: {
  },
  data () {
    return {
      myheight: '',
      user: 'hehe',
      searchTerm: '',
      items: [],
      rawHTML: '<span class=\'highlight\'>hahaha</span>',
      test: 'hahahehe'
    }
  },
  computed: {
    filteredList () {
      return this.items.filter((item) => {
        return item.name.includes(this.searchTerm) || item.description.includes(this.searchTerm)
      })
    }
  },
  // filters: {
  //   highlight (value) {
  //     // if (!value) return ''
  //     // // value = value.toString()
  //     // console.log('capitalize value is...', typeof value)
  //     // // return value.charAt(0).toUpperCase() + value.slice(1)
  //     // return ('<span class=\'highlight\'>' + value + '</span>')
  //     var iQuery = new RegExp(this.searchTerm, 'ig')
  //     return value.toString().replace(iQuery, matchedTxt => {
  //       return ('<span class=\'highlight\'>' + matchedTxt + '</span>')
  //     })
  //   }
  // },
  methods: {
    showItemDetails (itemId) {
      EventBus.$emit('item-details-modal', itemId)
    },
    highlight (text) {
      if (this.searchTerm) {
        let iQuery = new RegExp(this.searchTerm, 'ig')
        text = text.toString().replace(iQuery, matchedTxt => {
          return ('<span style=\'background-color: yellow\'>' + matchedTxt + '</span>')
        })
      }
      console.log('text is now ', text)
      return `<span>${text}</span>`
    },
    determineWinner (itemId) {
      console.log('DW client')
      axios.post('http://localhost:3000/item/determineWinner', { itemId: itemId })
    }
  },
  created () {
    services.getItems().then(items => {
      this.items = items
      console.log('this.items is...', this.items)
      for (let item of this.items) {
        console.log('item is ', item)
      }
    })
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

.highlight {
  color: yellow;
}
</style>
