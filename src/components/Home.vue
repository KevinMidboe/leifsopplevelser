<template>
  <div class="site-header">
<!--     <h1>{{ title }}</h1>
    <h2>Han har ikke hatt nok etter 60 år!</h2>
    {{ date }} -->
    <!-- <Header></Header> -->
    <router-link to="edit">Edit Page</router-link>

    <event-page></event-page>
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
        bool: false
      }
    },
    created() {
      this.date = new Date();
    },
    methods: {
      navigate: function() {
        console.log(this.$router)
        this.$router.push('/edit');
      }
    }
  }
</script>

<style language="scss">
  h2 {
    text-align: center;
    font-weight: normal;
  }
</style>