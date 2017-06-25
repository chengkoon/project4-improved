<template>
  <div class="tikam"> <!-- list of items -->
    <section class="hero is-info search-bar">
      <div class="hero-body">
        <div class="container">
          <div class="level columns">
            <div class="level-left column is-two-thirds">
              <div class="columns">
                <div class="level-item column is-half">
                  <p class="control has-icons-left">
                    <input class="input" type="text" v-model="searchTerm" placeholder="Do an instant search here">
                    <span class="icon is-small is-left">
                      <i class="fa fa-search"></i>
                    </span>
                  </p>
                </div>
                <div class="level-item column">
                  <p class="control">
                    <span class="select">
                      <select>
                        <option>Select dropdown</option>
                        <option>With options</option>
                      </select>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="level-right column">
              <div class="columns is-pulled-right">
                <div class="level-item">
                  <div class="pagination" v-if="filteredList.length > 4">
                    <a class="pagination-previous" @click="goToPage('prev')"><</a>
                    <a class="pagination-next" @click="goToPage('next')">></a>
                    <ul class="pagination-list">
                      <li v-for="n in numberOfPages">
                        <a class="pagination-link" :class="{'is-current': checkIfCurrentPage(n)}" @click="goToPage(n)">{{n}}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- <div class="columns">
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
      <div class="field column is-4">
        <p class="control">
          <label class="radio">
            <input type="radio" name="question">
            All Bids
          </label>
          <label class="radio">
            <input type="radio" name="question">
            Past Bids
          </label>
          <label class="radio">
            <input type="radio" name="question">
            Ongoing Bids
          </label>
        </p>
      </div>
    </div> -->
    <div class="hero is-light">
      <div class="hero-body">
        <div class="card-container columns">
          <div class="card column is-3" v-for="(item, index) in filteredList" v-if="(index < currentPage * 3) && (index >= (currentPage - 1) * 3)">
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
                  <a :href="item.productURL"><p class="title is-6"><span v-html="highlight(item.name)"></span></p></a>
                  <p class="subtitle is-6">@johnsmith</p>
                </div>
              </div>

              <div class="content">
                <span v-html="highlight(item.description)"></span>
              </div>
            </div>
            <!-- <footer class="card-footer">
              <p class="card-footer-item column">
                <span>
                  Donations
                </span>
              </p>
              <p class="card-footer-item">
                <span v-if="!item.winningBid">
                  <a @click="showItemDetails(item._id)">Bid</a>
                </span>
                <span v-if="item.winningBid">
                  <a @click="determineWinner(item._id)">Results!</a>
                </span>
              </p>
            </footer> -->
            <footer class="level">
              <div class="level-left">
                <div class="level-item" @mouseover="changeHomeIconColor(item, true)" @mouseout="changeHomeIconColor(item, false)">
                  <i class="fa fa-lg fa-home" :class="{ 'green': item.homeHovered }"></i><span class="footer-text">SPCA</span>
                </div>
                <div class="level-item" @mouseover="changeDollarIconColor(item, true)" @mouseout="changeDollarIconColor(item, false)">
                  <i class="fa fa-dollar" :class="{ 'green': item.dollarHovered }"></i><span class="footer-text">112</span>
                </div>
              </div>
              <div class="level-right">
                hehe
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="pagination" v-if="filteredList.length > 4">
      <a class="pagination-previous" @click="goToPage('prev')">Previous</a>
      <a class="pagination-next" @click="goToPage('next')">Next page</a>
      <ul class="pagination-list">
        <li v-for="n in numberOfPages">
          <a class="pagination-link" :class="{'is-current': checkIfCurrentPage(n)}" @click="goToPage(n)">{{n}}</a>
        </li>
      </ul>
    </div> -->
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
    },
    changeHomeIconColor (item, v) {
      item.homeHovered = v
    },
    changeDollarIconColor (item, v) {
      item.dollarHovered = v
    }
  },
  created () {
    services.getItems().then(items => {
      for (let item of items) {
        // item.hovered = false
        this.$set(item, 'homeHovered', false)
        this.$set(item, 'dollarHovered', false)
      }
      this.items = items
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

.is-info>div.hero-body {
  padding-top: 18px;
  padding-bottom: 18px;
}

/*div.container.columns {
  display: flex;
  justify-content: space-between;
  margin: 0px;
} */
div.card.column {
  padding: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
div.card-content {
  padding: 12px;
}
div.card-container {
  display: flex;
  justify-content: space-around;
}
div.content {
  text-align: left;
}

footer.level {
  border-top: 1px solid rgb(219, 219, 219);
  background-color: rgb(245, 245, 245);
  padding: 10px;
}
footer i {
  color: rgb(172, 172, 172);
  font-weight: 500;
}

i.green {
  color: #42b983;
}


.footer-text {
  margin-left: 6px;
  font-weight: bold;
  font-size: 12px;
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
