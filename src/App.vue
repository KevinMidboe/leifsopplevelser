<template>
  <div id="app" class="container">
    <router-view />

  </div>
</template>

<script>
  import Vue from 'vue'
  import Home from '@/components/Home.vue'
  import routes from '@/routes'

  export default {
    name: 'App',
    components: {
      Home
    },
    data() {
      return {
        loaded: false
      }
    },
    methods: {
    }
  }
</script>

<style lang="scss">
  @import './scss/main.scss';
</style>
