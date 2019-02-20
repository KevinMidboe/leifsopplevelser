<template>
  <div>
    <!-- <div class="site-header"></div> -->
<!--     <h1>{{ title }}</h1>
    <h2>Han har ikke hatt nok etter 60 år!</h2>
    {{ date }} -->
    <!-- <Header></Header> -->
    
    <div class="container">
      <h1 class="header">leifs opplevelser</h1>
      <event-page style="height: 100%; overflow: auto;"></event-page>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import EventPage from '@/components/EventPage'

export default {
  components: { Header, EventPage },
  data() {
    return {
      title: 'Leifs opplevelser',
      date: undefined,
      bool: false,

    }
  },
 
  methods: {
    // openPopover(url) {
    //   console.log('popover received with', url)
    //   this.popoverImage = url;
    //   this.popoverShow = true;
    //   document.body.classList.add('disableScroll');
    // },
    // closePopover(url) {
    //   this.popoverShow = false;
    //   document.body.classList.remove('disableScroll');
    // },
    navigate: function() {
      console.log(this.$router)
      this.$router.push('/edit');
    }
  }
}
</script>

<style language="scss" scoped>

  .header {
    margin-bottom: 5rem;
  }

  h2 {
    text-align: center;
    font-weight: normal;
  }

  .container {
    min-height: 1029px;

    margin: 25px auto 85px;
    padding: 4em;
    max-width: 888px;
    /*max-width: 100%;*/
    background-color: #fff;
  }
</style>