<template>
  <div>
    <h3>{{ text.title }}</h3>
    <p>{{ text.subtext }}</p>
  </div>
</template>

<script>

export default {
  components: {

  },
  props: {
    text: {
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

</style>