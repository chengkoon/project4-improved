<template>
  <div class="profile-modal modal is-active" tabindex="-100" @keyup.esc="closeThisModal">
    <div class="modal-background" @click="closeThisModal"></div>
    <div class="modal-content">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img src="http://bulma.io/images/placeholders/128x128.png" alt="">
            </figure>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'profile-modal',
  data () {
    return {
    }
  },
  methods: {
    closeThisModal () {
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
