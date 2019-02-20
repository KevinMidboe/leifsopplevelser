<template>
  <div id="app" class="container">

    <router-view />

    <Popover class="popup" v-if="popoverState"></Popover>
    
  </div>
</template>

<script>
import Vue from 'vue'
import Popover from '@/components/Popover'
import routes from '@/routes'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: { Popover },
  computed: mapGetters([
    'popoverState',
  ]),
}
</script>

<style lang="scss">
  @import './scss/main.scss';
</style>
