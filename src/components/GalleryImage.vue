<template>
  <div v-bind:class="{ isWide: wide }">
    <transition name="fade">
      {{ image }}
      <img :src="dynamicImageUrl" @click="popover(image)" v-on:load="onLoaded" v-show="loaded" class="gallery-image" />
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
    thumbnail: {
      type: Boolean,
      required: false,
      default: false
    },
    wide: {
      type: Boolean
    }
  },
  computed: {
    dynamicImageUrl: function() {
      console.log('thumbnail', this.thumbnail)
      if (this.thumbnail) {
        return this.image.url.replace('_lg.', '_thumb.');
      }
      return this.image.url.replace('_lg.', '_sm.');
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
      // this.setPopoverAlbumIndex(this.index)
      // this.showPopover()
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
  // max-height: 350px;
  // max-width: 350px;
  // width: 350px;
  cursor: pointer;
  padding: 0.2rem;
}

 .isWide img {
    width: 100%;
    height: unset;
  }


</style>