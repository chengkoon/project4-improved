<template>
  <div class="show-winner-modal modal is-active">
    <div class="modal-background" @click="closeThisModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Winner is...</p>
        <button class="delete" @click="closeThisModal"></button>
      </header>
      <section class="modal-card-body">
        <i class="fa fa-trophy fa-5x"></i>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'show-winner-modal',
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

<style lang="css">
.modal {
  text-align: left;
}
.modal-card {
  width: 400px;
}
.modal-card-head {
  background-color: inherit;
  border-color: inherit;
  text-align: left;
  padding: 0;
  padding-bottom: 8px;
}
.modal-card-title {
  color: white;
}
.modal-card-body {
  border-radius: 4px;
  text-align: center;
}
i.fa-trophy {
  color: gold;
}
</style>
