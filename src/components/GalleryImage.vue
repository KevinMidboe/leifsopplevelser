<template>
  <div>
    {{ index }}
      <img :src="image.url" @click="popover(image)"/>
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
    }
  },
  methods: {
    showPopover: () => store.dispatch('showPopover'),
    setPopoverAlbumIndex: (index) => store.dispatch('setPopoverAlbumIndex', index),

    popover(image) {
      this.setPopoverAlbumIndex(this.index)
      this.showPopover()
      this.$emit('click', image)
    }
  }
}
</script>

<style lang="scss" scoped>
  img {
    height: 300px;
    cursor: pointer;
    margin: 0 0.5rem;

    @media screen and (max-width: 600px) {
      background-color: red;
      height: unset;
      width: 100%;
    }
  }
</style>