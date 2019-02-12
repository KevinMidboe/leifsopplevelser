<template>
  <div>
      <img :src="image.url" @click="popOver(image)"/>
      <p>{{ image.name }}</p>
  </div>
</template>

<script>

export default {
  components: {

  },
  props: {
    image: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
    }
  },
  created() {},
  beforeMount() {},
  methods: {
    popOver(image) {
      eventHub.$emit('openPopover', image);
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