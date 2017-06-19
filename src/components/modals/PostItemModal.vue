<template>
  <div class="post-item-modal modal columns" :class="{ 'is-active': true }">
  <div class="modal-background"></div>
  <div class="card column is-half">
    <div class="card-image">
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <div class="dropbox" v-if="isInitial">
          <input type="file" multiple :name="uploadFieldName"
          :disabled="isSaving"
          @change="filesChange($event.target);
          fileCount = $event.target.files.length"
          accept="image/*" class="input-file">
            <p v-if="isInitial">
              Drag your image here to begin<br> or click to browse
            </p>
        </div>
        <div class="dropbox" v-if="isSaving">
          <p>
            Uploading your image...
          </p>
        </div>
      </form>
      <form enctype="multipart/form-data" action="/" method="POST">
        <input type="file" @change="filesChange($event.target)" name="myFile">
        <input type="submit" class="btn btn-primary">
      </form>
      <figure class="image is-2by1" v-if="isSuccess">
        <img :src="resizedImgURL" :alt="uploadedImg.original_filename">
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        <div class="field">
          <label class="label is-small">Product Name</label>
          <p class="control">
            <input class="input is-small" type="text" placeholder="T138 Headphones">
          </p>
        </div>
      </div>
      <div class="content">
        <div class="field">
          <label class="label is-small">Product URL</label>
          <p class="control">
            <input class="input is-small" type="text" placeholder="https://www.XYZ.com/t138">
          </p>
        </div>
      </div>
      <div class="field">
        <label class="label is-small">Message</label>
        <p class="control">
          <textarea class="textarea is-small" placeholder="Textarea"></textarea>
        </p>
      </div>
      <div class="columns">
        <div class="field column is-half">
          <label class="label is-small">Start of Bidding</label>
          <p class="control">
            <span class="select is-small">
              <select>
                <option>Date</option>
                <option>options</option>
              </select>
            </span>
          </p>
        </div>
        <div class="field column">
          <label class="label is-small">To</label>
          <p class="control">
            <span class="select is-small">
              <select>
                <option>Date</option>
                <option>options</option>
              </select>
            </span>
          </p>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
        <span>
          View on <a href="https://twitter.com/codinghorror/status/506010907021828096">Twitter</a>
        </span>
      </p>
      <p class="card-footer-item">
        <span>
          Share on <a href="#">Facebook</a>
        </span>
      </p>
    </footer>
    <!-- <header class="modal-card-head">
      <p class="modal-card-title">Post Item</p>
      <button class="delete"></button>
    </header>
    <section class="modal-card-body">

    </section>
    <footer class="modal-card-foot">
      <a class="button is-success">Save changes</a>
      <a class="button">Cancel</a>
    </footer> -->
  </div>
</div>
</template>

<script>

import { EventBus } from '../../event-bus.js'
import { upload } from '../file-upload.service'

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  name: 'post-item-modal',
  data () {
    return {
      itemDetails: {

      },
      showThisModal: false,
      uploadedImg: {},
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos'
    }
  },
  computed: {
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
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
    resizedImgURL () {
      return `http://res.cloudinary.com/drkrmbkx3/image/upload/c_imagga_crop/${this.uploadedImg.public_id}.${this.uploadedImg.format}`
    }
  },
  methods: {
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadedImg = {}
      this.uploadError = null
    },
    save (formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING

      // upload(formData) // from file-upload.service.js
        // .then(x => {
        //   this.uploadedFiles = [].concat(x)
        //   this.currentStatus = STATUS_SUCCESS
        // })
        // .catch(err => {
        //   this.uploadError = err.response
        //   this.currentStatus = STATUS_FAILED
        // })
      upload(formData)
      .then(res => {
        console.log('res is...', res)
        this.uploadedImg = res
        this.currentStatus = STATUS_SUCCESS
      })
      .catch(err => {
        console.log('error is...', err)
      })
    },
    // filesChange (fieldName, fileList) {
    //   // handle file changes
    //   const formData = new FormData()
    //   if (!fileList.length) return
    //
    //   // append the files to FormData
    //   Array
    //     .from(Array(fileList.length).keys())
    //     .map(x => {
    //       formData.append(fieldName, fileList[x], fileList[x].name)
    //     })
    //   console.log('formData is now...', formData)
    //
    //   // save it
    //   this.save(formData)
    // }
    filesChange (eventTarget) {
      // console.log('process.env is ...', process.env)
      // console.log('eventTarget is...', eventTarget)
      // console.log('eventTarget.files is...', eventTarget.files[0].name)
      // const formData = new FormData()
      // console.log('clean formData is...', formData)
      // formData.append('file', eventTarget.files[0])
      // formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET)
      // console.log('formData is now...', formData)
      // this.save(formData)

      console.log(eventTarget.files[0])
      // let fileName = eventTarget.files[0].name
      // upload(fileName)
    }
  },
  mounted () {
    this.reset()
  },
  created () {
    EventBus.$on('post-item-modal', (status) => {
      this.showThisModal = status
    })
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
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
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
