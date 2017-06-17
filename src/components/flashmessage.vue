<template>

  <div class="alert alert-warning alert-dismissible" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <span class="message"><strong>Hey!</strong>The message passed down is: {{ message }}</span>
  </div>

</template>

<script>
export default {
  name: 'flashmessage',
  props: ['message'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alert {
  max-width: 50%;
  margin: 0 auto;
  text-align: left;
}
</style>
