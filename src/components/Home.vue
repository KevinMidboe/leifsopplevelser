<template>
  <div>
    <!-- <div class="site-header"></div> -->
<!--     <h1>{{ title }}</h1>
    <h2>Han har ikke hatt nok etter 60 år!</h2>
    {{ date }} -->
    <Header>Leifs opplevelser 2019</Header>
    <Navigation></Navigation>
    
<!--     <div class="header">
      <h1>{{ title }}</h1>
    </div> -->

    <calendar :long="false"></calendar>
    
    <div class="" v-for="event in events">
    <!-- <div class="container" v-for="event in events"> -->
      <event-page :eventData="event"></event-page>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import EventPage from '@/components/EventPage'
import Calendar from '@/components/Calendar'
import Footer from '@/components/Footer'

import { adventureList } from '@/utils/leifsbackend-api'

export default {
  components: { Header, Navigation, EventPage, Calendar, Footer },
  data() {
    return {
      title: 'leifs opplevelser',
      events: undefined

    }
  },
  beforeMount() {
    this.fetchEvents()
  },
 
  methods: {
    fetchEvents() {
      adventureList()
        .then((data) => {
          console.log('response from fetch events', data)
          this.events = data;
        })
        .catch((error) => console.log('unable to fetch events from api; error message:', error))
    },
    navigate: function() {
      console.log(this.$router)
      this.$router.push('/edit');
    }
  }
}
</script>


<style lang="scss" scoped>

  .header {
    /*margin: 0 auto;*/
    /*max-width: 1200px;*/
    margin: 2rem 2rem;
    // width: 100%;
    /*padding: 2.5rem 0rem 2rem 3.5rem;*/
    /*margin-bottom: 5rem;*/
    h1 {
      text-align: center;
      font-size: 3rem;
    }
  }

  h2 {
    text-align: center;
    font-weight: normal;
  }

</style>