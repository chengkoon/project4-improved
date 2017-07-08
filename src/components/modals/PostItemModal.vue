<template>
  <div class="post-item-modal modal is-active" tabindex="-100" @keyup.esc="closeThisModal">
  <div class="modal-background" @click="closeThisModal"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Post Item</p>
      <button class="delete" @click="closeThisModal"></button>
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
              <label class="label">Product Name</label>
              <p class="control">
                <input class="input" type="text" ref="name" placeholder="T138 Headphones" v-model="itemDetails.name">
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
              <div class="textarea-container">
                <textarea class="textarea" ref="description" placeholder="Minimum of 100 characters..." v-model="itemDetails.description"></textarea>
                <div class="content char-count is-small">min. of 100 characters, current count: {{itemDetails.description.length}}</div>
              </div>
            </p>
          </div>
          <div class="columns start-time">
            <div class="field column is-half">
              <label class="label">Bidding Start Date</label>
              <p class="control">
                <span class="select">
                  <select v-model="itemDetails.selectedStartDate">
                    <option disabled>Pick a starting date</option>
                    <option v-for="date in fullDateRange">{{date}}</option>
                  </select>
                </span>
              </p>
            </div>
            <div class="field column">
              <label class="label">Start Time</label>
              <p class="control">
                <span class="select">
                  <select v-if="!itemDetails.selectedStartDate">
                    <option>Pick a start date first</option>
                  </select>
                  <select v-model="itemDetails.selectedStartTime" v-if="itemDetails.selectedStartDate">
                    <option disabled>Pick a starting time</option>
                    <option v-for="time in computedStartTimeRange">{{time}}</option>
                  </select>
                </span>
              </p>
            </div>
          </div>
          <div class="columns">
            <div class="field column is-half">
              <label class="label">Bidding End Date</label>
              <p class="control">
                <span class="select">
                  <select v-model="itemDetails.selectedEndDate">
                    <option disabled>Pick an end date</option>
                    <option v-for="date in computedEndDateRange">{{date}}</option>
                  </select>
                </span>
              </p>
            </div>
            <div class="field column">
              <label class="label">End Time</label>
              <p class="control">
                <span class="select">
                  <select v-if="!itemDetails.selectedEndDate">
                    <option>Pick an end date first</option>
                  </select>
                  <select v-model="itemDetails.selectedEndTime" v-if="itemDetails.selectedEndDate">
                    <option disabled>Pick an end time</option>
                    <option v-for="time in computedEndTimeRange">{{time}}</option>
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
                  <option disabled value="Z">Pick a charity organisation</option>
                  <option v-for="option in options" v-bind:value="option.value">{{option.text}}</option>
                </select>
              </span>
            </p>
          </div>
        </div>

      </div>
    </section>
    <footer class="modal-card-foot">
      <button type="button" class="button is-success" @click="submitItem">Put item up for bidding!</button>
      <button type="button" class="button" @click="closeThisModal">Cancel</button>
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
        selectedStartDate: '',
        selectedStartTime: '',
        selectedEndDate: '',
        selectedEndTime: '',
        bidStartMS: '',
        bidEndMS: '',
        receipientCharity: 'Z'
      },
      // showThisModal: false,
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos',
      fullDateRange: [],
      fullTimeRange: [],
      selected: 'A',
      options: [
        { text: 'Autism Association', value: 'ACRA' },
        { text: 'Bright Vision Hospital', value: 'BVH' },
        { text: 'Children Aid Society', value: 'CAS' }
      ],
      errorLocation: ''
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
    computedStartTimeRange () {
      if (this.itemDetails.selectedStartDate !== this.fullDateRange[0]) { // if sponsor did not choose today
        return this.fullTimeRange
      } else {
        // if sponsor chose today as start date, slice away the timeslots that has/have passed
        let dateNow = new Date()
        let minutesPassed = (dateNow.getHours() * 60) + (dateNow.getMinutes())
        let indexesToBeSliced = ((minutesPassed / 15) | 0)
        return this.fullTimeRange.slice(indexesToBeSliced + 1, this.fullTimeRange.length)
      }
    },
    computedEndDateRange () {
      let indexOfSelectedStartDate = this.fullDateRange.indexOf(this.itemDetails.selectedStartDate)
      if (this.itemDetails.selectedStartTime === '23:59') {
        return this.fullDateRange.slice(indexOfSelectedStartDate + 1, this.fullDateRange.length)
      } else if (this.itemDetails.selectedStartDate !== this.fullDateRange[0]) {
        return this.fullDateRange.slice(indexOfSelectedStartDate, this.fullDateRange.length)
      } else { // or if sponsor has chosen today as start date AND selected start time is NOT 23:59
        return this.fullDateRange
      }
    },
    computedEndTimeRange () {
      if (this.itemDetails.selectedEndDate === this.itemDetails.selectedStartDate) { // if sponsor chose today for both start and end dates,
        // we need to check what he has chosen for selectedStartTime and determine endTimeRange from there
        let indexOfSelectedStartTime = this.fullTimeRange.indexOf(this.itemDetails.selectedStartTime)
        return this.fullTimeRange.slice(indexOfSelectedStartTime + 1, this.fullTimeRange.length)
      } else {
        return this.fullTimeRange
      }
    },
    validateDetailsToBeSubmitted () {
      if (!this.itemDetails.name) {
        this.errorLocation = 'name'
        return false
      } else if (this.itemDetails.description.length < 100) {
        this.errorLocation = 'description'
        return false
      }
      return true
    }
  },
  methods: {
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadError = null
      // this.receivedImgURL = ''
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
      if (this.validateDetailsToBeSubmitted) {
        this.itemDetails.bidStartMS = moment(this.itemDetails.selectedStartDate + ' ' + this.itemDetails.selectedStartTime, 'ddd DD-MM-YYYY HH:mm').valueOf()
        this.itemDetails.bidEndMS = moment(this.itemDetails.selectedEndDate + ' ' + this.itemDetails.selectedEndTime, 'ddd DD-MM-YYYY HH:mm').valueOf()
        console.log('item to be submitted is...', this.itemDetails)
        services.createItem(this.itemDetails)
        .then(res => {
          if (res.success) {
            EventBus.$emit('flash', 'Item posted successfully')
            this.$router.push('/#tikam')
          } else if (!res.success) { // server-side validation
            console.log('at client side, res.err is ', res.err)
          }
        })
      } else if (!this.validateDetailsToBeSubmitted) {
        this.$refs[this.errorLocation].focus()
      }
    },
    closeThisModal () {
      this.$router.push('/')
    },
    test12 () {
      console.log(12345)
    }
  },
  mounted () {
    this.reset()
    this.$refs.productName.focus() // this also enables the keyup.esc to work right off the bat
  },
  created () {
    console.log('postitemmodal created')
    // TODO get sponsor profile - logoURL and companyURL
    // generate an array of 31 dates
    for (let i = 0; i < 31; i++) {
      this.fullDateRange.push(moment().add(i, 'days').startOf('day').format('ddd DD-MM-YYYY'))
    }
    // generate a full array of time - 00:00 to 23:59 - takes up to around 20 milliseconds
    let timeOfNextQuarter = moment().startOf('day').format('HH:mm')
    let timeOfNextQuarterMS = moment().startOf('day').valueOf()
    let endOfTheDayMS = moment().endOf('day').valueOf()
    while (timeOfNextQuarterMS < endOfTheDayMS) {
      this.fullTimeRange.push(timeOfNextQuarter)
      timeOfNextQuarter = moment(timeOfNextQuarter, 'HH:mm').add(15, 'minutes').format('HH:mm')
      timeOfNextQuarterMS = timeOfNextQuarterMS + (15 * 60 * 1000)
    }
    this.fullTimeRange.push('23:59')
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
textarea {
  resize: none;
}
.char-count {
  text-align: right;
}
.start-time {
  margin-top: 10px;
}
#bid-dropdown1, #bid-dropdown2 {
  display: inline;
}
</style>
