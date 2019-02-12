<template>
  <div>
    <h1>kalender</h1>

    {{ longList }}
  </div>
</template>

<script>

export default {
  props: {
    longList: Boolean,
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
  
  div {
    width: 70%;
    display: block;
    margin: 6rem auto 0;
  }

</style>