<template>
  <div class="about-us">
    About us. how much has the community contributed to charities.
    <div class="big-box">
      something
    </div>
  </div>
</template>

<script>

export default {
  name: 'about-us',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      thing: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.about-us:before {
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
