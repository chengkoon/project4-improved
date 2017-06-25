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
      <div class="field column is-2">
        <div class="control">
          <label class="checkbox">
            <input type="checkbox" v-model="hasEnded">
            has ended
          </label>
        </div>
      </div>
    </div>
    <div class="columns is-10">
      <div class="card column is-one-quarter" v-for="(item, index) in filteredList" v-if="(index < currentPage * 4) && (index >= (currentPage - 1) * 4)">
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

    <div class="pagination" v-if="filteredList.length > 4">
      <a class="pagination-previous" @click="goToPage('prev')">Previous</a>
      <a class="pagination-next" @click="goToPage('next')">Next page</a>
      <ul class="pagination-list">
        <li v-for="n in numberOfPages">
          <a class="pagination-link" :class="{'is-current': checkIfCurrentPage(n)}" @click="goToPage(n)">{{n}}</a>
        </li>
      </ul>
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
      test: 'hahahehe',
      hasEnded: false,
      currentPage: 1
    }
  },
  computed: {
    filteredList () {
      this.currentPage = 1 // w/o this, there will be a bug when the user searches while currentPage === 2 or greater
      return this.items.filter((item) => {
        if (this.hasEnded) return (item.hasOwnProperty('winningBid') && (item.name.includes(this.searchTerm) || item.description.includes(this.searchTerm)))
        else if (!this.hasEnded) return item.name.includes(this.searchTerm) || item.description.includes(this.searchTerm)
      })
    },
    numberOfPages () {
      return (((this.filteredList.length / 4) | 0) + 1)
    }
  },
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
    goToPage (pageNumber) {
      if (pageNumber === 'next') {
        this.currentPage++
      } else if (pageNumber === 'prev') {
        this.currentPage--
      } else {
        this.currentPage = pageNumber
      }
    },
    checkIfCurrentPage (thisPage) {
      if (thisPage === this.currentPage) return true
      else return false
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
