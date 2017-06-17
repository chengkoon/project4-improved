<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <nav-bar></nav-bar>
    <flash-message></flash-message>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import flashmessage from './components/flashmessage.vue'
export default {
  name: 'app',
  components: {
    'nav-bar': Navbar,
    'flash-message': flashmessage
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
