<template>
  <div class="col-md-10 col-sm-12">
    <h1>Leifs opplevelser</h1>
    <h2>Han har ikke hatt nok etter 60 år!</h2>
    {{ date }}
  </div>
</template>

<script>
  // import '' from ''

  export default {
    data() {
      return {
        title: 'Leifs opplevelser',
        date: undefined,
        bool: false
      }
    },
    created() {
      this.date = new Date();
    }
  }
</script>

<style language="scss">
  h1 {
    font-size: 6rem;
    font-weight: 400;
    font-style: normal;
    text-align: center;
    text-transform: uppercase;
  }

  h2 {
    text-align: center;
    font-weight: normal;
  }
</style>