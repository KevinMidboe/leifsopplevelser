<template>
  <div v-if="eventData">
    <div class="form">
      <router-link :to="{ name: 'EditEvent', query: { id: eventData.id }}">
        
        <button class="button" @click="">Rediger</button>
        
      </router-link>
    </div>

    <div class="gallery">
      <div class="gallery--header">
        <h1>{{ eventData.title || title }}</h1>
        <div class="gallery--info">
          <p>
             {{ dateToDayMonthYear(eventData.dateStart) }}
             - 
             {{ dateToDayMonthYear(eventData.dateEnd) }}</p>
          <p>{{ eventData.locationName }} <a v-if="eventData.locationName" @click="toggleMap"> {{ showMap ? 'Lukk kart' : 'Vis kart'}}</a></p>

          <transition name="slide" class="transition">
            <map-view v-if="showMap" :mapboxData="mapboxData"></map-view>
          </transition>

          <p>{{ eventData.subtext }}</p>
        </div>
      </div>

      <!-- <map-view :cords="cords"></map-view> -->
      <!-- <calendar></calendar> -->

      <gallery :short="false" :id="eventData.id"></gallery>
    </div>
  </div>
</template>

<script>
import Gallery from '@/components/Gallery'
import MapView from '@/components/MapView'
import moment from 'moment'

export default {
  components: {
    Gallery, MapView
  },
  props: {
    eventData: {
      type: Object,
      required: false
    }
  },
  computed: {
    eventDate: function() {
      return { 
        from: this.startDate || '28.09.18',
        until: this.endDate || '12.10.19'
      }
    }
  },
  data() {
    return {
      showMap: false,
      mapboxData: undefined,

      title: 'Topptur til gaustadtoppen',
      eventLocation: 'Oslo, Gardermoen, Norge',
      startDate: undefined,
      endDate: undefined,
      subtext: 'On November 1, 2018, we embarked on our tour with Triathalon. Thank you so much to everyone who came to see us, for buying our merch, for saying hello after the shows, to the amazing hard-working people at the venues, and of course to our team + Live Nation, Ones to Watch, for booking us on our favorite tour this year. And thank you to Claud, Girl Ultra and Kevin Krauter for playing these shows with us. \n\n Here are some of our favorite moments captured by one of our favorite people, Meghan Cummings (@meghancummings). ',
      // mapboxData: {"id":"address.3598204582760676","type":"Feature","place_type":["address"],"relevance":1,"properties":{"accuracy":"point"},"text":"Rosendalsveien","place_name":"Rosendalsveien50b,1166Oslo,Norway","center":[10.799471,59.853973],"geometry":{"type":"Point","coordinates":[10.799471,59.853973]},"address":"50b","context":[{"id":"postcode.9489910510813950","text":"1166"},{"id":"place.17289044417596980","short_code":"NO-03","wikidata":"Q585","text":"Oslo"},{"id":"country.16020050790143780","short_code":"no","wikidata":"Q20","text":"Norway"}]}
    }
  },
  created() {
    const id = this.$route.params.id;
    console.log('id found', id)
    if (id) {
      fetch('http://localhost:5000/api/adventure/' + id)
      .then(resp => {
        console.log('resp', resp)
        resp.json()
      })
      .then(data => this.eventData = data)
    }
  },
  methods: {
    dateToDayMonthYear(date) {
      return moment(date).format('DD.MM.YYYY')

    },
    toggleMap() {
      if (this.showMap) {
        this.showMap = false
        return
      }

      var url = new URL('http://localhost:5000/api/location')
      url.search = new URLSearchParams({ name: this.eventData.locationName })

      fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.mapboxData = data.mapboxData;
        this.showMap = true;
      })
      .catch((err) => console.log('error fetching locations by name from server. Error:', err))
    }
  }
}
</script>

<style lang="scss" scoped>

.slide-enter-active, .slide-leave-active {
transition: margin-bottom .1s ease-out;
}

/*
you set the css property before transition starts
*/
.slide-enter, .slide-leave-to {
margin-bottom: -50vh;
}

/*
you set the css property it will be when transition ends
*/
.slide-enter-to, .slide-leave {
margin-bottom: 0px;
}


.gallery {
  // padding: 2.1rem;

  &--header {
    padding-bottom: 1rem;
    // background-color: NavajoWhite;
  }

  &--info {
    font-size: 15px;
    line-height: 1.6rem;
    letter-spacing: 0rem;
    color: rgba(0, 0, 0, .8);

    &:first-of-type {
      margin-top: 0.8rem;
    }

    a {
      font-family: 'Ambroise std demi';
      font-style: normal;
      color: #3b70a2;

      &:visited {
        color: #3b70a2;
      }
    }
  }

  &--subtext {
    font-size: 15px;
    line-height: 1.6rem;
    letter-spacing: 0rem;
    color: rgba(0, 0, 0, .8);
  }
}

.form {
  display: absolute;
  float: right;
  margin-top: 1rem;
  margin-right: 1rem;

}
.button {
  -webkit-appearance: none;
  -webkit-backface-visibility: none;
  border: 2.5px solid #c91119;
  border-radius: 3px;
  // color: rgb(255, 255, 255);
  background-color: white;
  color: #c91119;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  height: 42px;
  letter-spacing: 1px;
  line-height: 14px;
  margin-left: -10px;
  padding: 0 1rem;
  text-transform: uppercase;
  transition-delay: 0s;
  transition-duration: 0.1s;
  transition-property: opacity;
  transition-timing-function: linear;
  vertical-align: baseline;
  white-space: pre;
  writing-mode: horizontal-tb;

  &:hover, &:active, &:focus {
    color: white;
    background-color: #c91119;
  }
}
</style>