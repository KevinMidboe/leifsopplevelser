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
  header {
    height: 490px;
    background-color: #f5af52;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    background-image: url('https://eu.blackdiamondequipment.com/on/demandware.static/-/Library-Sites-SharedLibrary/default/dwf668bbc0/images/heroes/S19_Wind-Shells_HP-Hero.jpg');
    background-position: center;

    h1 {
      font-family: 'Maddac';
      color: white;
      text-transform: capitalize;
      margin-right: 10%;
      font-size: 3.5rem;
    }
  }

  .navigate-back {
    height: 100%;
    display: inline-block;
    background-color: blue;
  }
</style>