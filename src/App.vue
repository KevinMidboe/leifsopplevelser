<template>
  <div id="app">

    <router-view />

    <Popover class="popup" v-if="popoverState" v-bind:class="[popoverState ? 'blur' : '', 'bk']"></Popover>
  </div>
</template>

<script>
import Vue from 'vue'
import routes from '@/routes'
import Popover from '@/components/Popover'
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

.bk {
  transition: all 2s ease-out;
}

.blur {
  // filter: blur(2px);
  opacity: 1;
}
</style>
