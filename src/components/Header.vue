<template>
  <header>
    <!-- <div class="navigate-back">Tilbake</div> -->
    <h1><slot></slot></h1>
  </header>
</template>

<script>

export default {
  components: {

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
@import url('https://fonts.googleapis.com/css?family=Alegreya+Sans+SC:700|Roboto+Slab:700|Source+Sans+Pro:600');
  
  header {
    height: 490px;
    @media screen and (max-width: 600px) {
      height: 350px;
    }
    background-color: #f5af52;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    background-image: url('https://eu.blackdiamondequipment.com/on/demandware.static/-/Library-Sites-SharedLibrary/default/dwf668bbc0/images/heroes/S19_Wind-Shells_HP-Hero.jpg');
    background-position: center;

    h1 {
      font-family: 'Roboto Slab', sans-serif;
      // font-family: 'Source Sans Pro', sans-serif;
      // font-family: 'Alegreya Sans SC', sans-serif;
      color: white;
      background-color: rgba(0,0,0,0.4);
      text-transform: capitalize;
      margin-right: 15%;
      font-size: 3.5rem;

      @media screen and (max-width: 600px) {
        margin: 10px;
        padding: 1rem;
        font-size: 2.8rem;
        text-align: center;
      }

      padding: 1.5rem;
      border: 4px solid white;
    }
  }

  .navigate-back {
    height: 100%;
    display: inline-block;
    background-color: blue;
  }
</style>