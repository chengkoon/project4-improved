<template>
  <div class="tikam"> <!-- list of items -->
    tikam page. Call to action. How-to. Item gallery.
    <div class="big-box">
      something
    </div>
  </div>
</template>

<script>

// import { EventBus } from '../event-bus.js'
// import { directive as onClickaway } from 'vue-clickaway'

export default {
  name: 'tikam',
  components: {
  },
  data () {
    return {
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
