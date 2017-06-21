<template>
  <div id="modal" class="modal" :class="{ 'is-active': showThisModal }">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Post Item</p>
      <button class="delete" @click="showThisModal = false"></button>
    </header>
    <section class="modal-card-body">
      <div class="content">
        <div class="card-image">
          <form enctype="multipart/form-data" id="myForm" @change="uploadImg($event.target)" novalidate v-if="isInitial || isSaving || isImageMounted" action="http://localhost:3000/newImage" method="POST">
            <div class="dropbox" v-if="isInitial || isSaving || isImageMounted">
              <input type="file" name="myFile"
              :disabled="isSaving"
              accept="image/*" class="input-file">
              <p v-if="isInitial">
                <!-- Preview your image here -->
                Click to upload image
              </p>
              <p v-if="isSaving">
                Uploading your image...
              </p>
            </div>
          </form>
          <div class="dropbox" v-if="isSuccess">
            <img :src="itemDetails.imgURL" alt="">
          </div>
        </div>
        <div class="card-content">
          <div class="content">
            <div class="field">
              <label class="label">Product Name (this will appear at the top)</label>
              <p class="control">
                <input class="input" type="text" placeholder="T138 Headphones" v-model="itemDetails.name">
              </p>
            </div>
          </div>
          <div class="content">
            <div class="field">
              <label class="label">Product URL</label>
              <p class="control">
                <input class="input" type="text" placeholder="https://www.XYZ.com/t138" v-model="itemDetails.productURL">
              </p>
            </div>
          </div>
          <div class="field">
            <label class="label">Product Description</label>
            <p class="control">
              <textarea class="textarea" placeholder="Textarea" v-model="itemDetails.description"></textarea>
            </p>
          </div>
          <div class="columns">
            <div class="field column is-half">
              <label class="label">Start of Bidding</label>
              <p class="control">
                <span class="select">
                  <select v-model="itemDetails.bidStart">
                    <option v-for="time in timeStart">{{time}}</option>
                  </select>
                </span>
              </p>
            </div>
            <div class="field column">
              <label class="label">To</label>
              <p class="control">
                <span class="select">
                  <select v-model="itemDetails.bidEnd"> <!-- v-for... -->
                    <option v-for="time in getBidEndTime">{{time}}</option>
                  </select>
                </span>
              </p>
            </div>
          </div>
          <div class="field">
            <label class="label">Choice of Charity Organisation</label>
            <p class="control">
              <span class="select">
                <select v-model="itemDetails.receipientCharity">
                  <option>Animal Concerns Research and Education Society</option>
                  <option>Children's Aid Society</option>
                  <option>Humanitarian Organization for Migration Economics</option>
                  <option>Make-A-Wish Foundation</option>
                  <option>Movement for the Intellectually Disabled of Singapore</option>
                  <option>National Kidney Foundation</option>
                  <option>Ren Ci Hospital and Medicare Centre</option>
                  <option>Salvation Army</option>
                  <option>Singapore Association of the Visually Handicapped</option>
                </select>
              </span>
            </p>
          </div>
        </div>

      </div>
    </section>
    <footer class="modal-card-foot">
      <a class="button is-success" @click="submitItem">Put item up for bidding!</a>
      <a class="button">Cancel</a>
    </footer>
  </div>
</div>
</template>

<script>

import { EventBus } from '../../event-bus.js'
import services from '../../services'
import axios from 'axios'
import moment from 'moment'

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3
const STATUS_IMAGE_MOUNTED = 4

export default {
  name: 'post-item-modal',
  data () {
    return {
      itemDetails: {
        name: '',
        imgURL: '',
        productURL: '',
        description: '',
        bidStart: '',
        bidEnd: '',
        receipientCharity: ''
      },
      showThisModal: false,
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos',
      timeStart: []
    }
  },
  computed: {
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isImageMounted () {
      return this.currentStatus === STATUS_IMAGE_MOUNTED
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    },
    getBidEndTime () {
      let timeEnd = []
      for (let i = 0; i < 14; i++) {
        timeEnd.push(moment(this.itemDetails.bidStart, 'ddd DD-MM-YYYY HH:mm:ss').add(i, 'days').endOf('day').format('ddd DD-MM-YYYY HH:mm:ss'))
      }
      return timeEnd
      // let haha = moment(this.itemDetails.bidStart, 'ddd DD-MM-YYYY HH:mm:ss').endOf('day').format('ddd DD-MM-YYYY HH:mm:ss')
    }
  },
  methods: {
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadError = null
      this.receivedImgURL = ''
    },
    uploadImg (eventTarget) {
      this.currentStatus = STATUS_SAVING

      const formData = new FormData()
      formData.append(eventTarget.name, eventTarget.files[0], eventTarget.files[0].name)
      console.log('inside uploadImg')
      axios.post('http://localhost:3000/item/newImage', formData, { headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
      .then(res => {
        console.log('res is...', res)
        this.itemDetails.imgURL = res.data.url
        this.currentStatus = STATUS_SUCCESS
      }).catch(err => {
        console.log('err is...', err)
        this.currentStatus = STATUS_FAILED
      })
    },
    submitItem () {
      console.log('item to be submitted is...', this.itemDetails)
      services.createItem(this.itemDetails)
    }
  },
  mounted () {
    this.reset()
  },
  created () {
    EventBus.$on('post-item-modal', (status) => {
      this.showThisModal = status
    })
    // var startString = Date()
    // this.timeStart = moment(startString, 'ddd MMM DD YYYY HH:mm:ss')
    // this.timeStart = moment(startString, 'dddd MMM DD YYYY HH:mm:ss').add(1, 'days').startOf('day')
    // this.timeEnd = moment().add(1, 'days').endOf('day').format('ddd DD-MM-YYYY HH:m:ss')
    for (let i = 1; i < 14; i++) {
      this.timeStart.push(moment().add(i, 'days').startOf('day').format('ddd DD-MM-YYYY HH:mm:ss'))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.big-box {
  border: 2px solid black;
  width: 300px;
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

.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 180px;
  position: absolute;
  left: 0px;
  cursor: pointer;
  z-index: 900;
}
/*.top-layer {
  position: absolute;
  z-index: 1000;
}*/

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 60px 0;
  vertical-align: middle;
}

.label {
  text-align: left;
}
div.content {
  margin-bottom: 10px;
}
input {
  padding-bottom: 0;
}
#bid-dropdown1, #bid-dropdown2 {
  display: inline;
}
</style>
