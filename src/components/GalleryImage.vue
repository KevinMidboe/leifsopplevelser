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

  }
}
</script>

<style lang="scss" scoped>
  img {
    height: 300px;
    cursor: pointer;

    @media screen and (max-width: 600px) {
      background-color: red;
      height: unset;
      width: 100%;
    }
  }
</style>