<template>
  <div class="how-it-works"> <!-- list of items -->
    how it works page.
    <div class="big-box">
      how it works
    </div>
  </div>
</template>

<script>

// import { EventBus } from '../event-bus.js'
// import { directive as onClickaway } from 'vue-clickaway'

export default {
  name: 'how-it-works',
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
.how-it-works:before {
  display: block;
  content: " ";
  margin-top: -105px;
  height: 105px;
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
