<template>
  <div class="about-us">
    About us. how much has the community contributed to charities.
    <div class="big-box">
      <div class="hiwCard div1 foo">WOOT</div>
      <div class="hiwCard div2 animated slideInUp"></div>
      <div class="hiwCard div3 animated slideInUp"></div>
    </div>
  </div>
</template>

<script>
const sr = require('scrollreveal')()

export default {
  name: 'about-us',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      thing: ''
    }
  },
  mounted () {
    // console.log('sr is ', sr)
    sr.reveal('.foo')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*.about-us:before {
  display: block;
  content: " ";
  margin-top: -105px;
  height: 105px;
  visibility: hidden;
}*/
.wow {
  visibility: hidden;
}
.about-us {
  height: 500px;
}
.big-box {
  height: 100%;
  border: 2px solid black;
  display: flex;
  justify-content: space-around;
}
.hiwCard {
  width: 200px;
  height: 50%;
  margin: 30px;
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
