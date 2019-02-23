<template>
  <div v-bind:class="{ isWide: wide }">
    <transition name="fade">
      <img :src="image.url" @click="popover(image)" v-on:load="onLoaded" v-show="loaded"/>
    </transition>
    <p>{{ image.name }}</p>
  </div>
</template>

<script>
import store from '@/store'

export default {
  props: {
    image: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
    },
    wide: {
      type: Boolean
    }
  },
  data() {
    return {
      loaded: false
    }
  },
  methods: {
    showPopover: () => store.dispatch('showPopover'),
    setPopoverAlbumIndex: (index) => store.dispatch('setPopoverAlbumIndex', index),

    onLoaded() { this.loaded = true },

    popover(image) {
      this.setPopoverAlbumIndex(this.index)
      this.showPopover()
      this.$emit('click', image)
    }
  }
}
</script>

<style lang="scss" scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease-in-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

img {
  max-height: 250px;
  max-width: 250px;
  cursor: pointer;
  margin: 0 0.5rem;

  @media screen and (max-width: 600px) {
    background-color: red;
    height: unset;
    width: 100%;
  }
}

 .isWide img {
    width: 100%;
    height: unset;
  }


</style>