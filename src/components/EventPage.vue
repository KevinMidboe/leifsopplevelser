<template>
  <div v-if="eventData">
    <div class="form">
      <router-link :to="{ name: 'EditEvent', query: { id: eventData.id }}">
        
        <button class="button" @click="">Rediger</button>
        
      </router-link>
    </div>


    <div>
      <h1>{{ title }}</h1>
      <div class="eventDescription">
        <p>{{ eventDuration }}</p>
        
        <div v-if="locationName">
          <span>{{ locationName }}</span>
          <a @click="showMap = !showMap"> {{ showMap ? 'Lukk kart' : 'Vis kart' }}</a>

          <transition name="slide" class="transition">
            <map-view v-if="showMap" :locationName="locationName"></map-view>
          </transition>

          <AdventureGallery :id="eventData.id"></AdventureGallery>
        </div>
      </div>
    </div>


<!--     <div class="gallery">
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

      <gallery :short="false" :id="eventData.id"></gallery>
    </div> -->
  </div>
</template>

<script>
import AdventureGallery from '@/components/AdventureGallery'
import MapView from '@/components/MapView'
import moment from 'moment'

import { locationByName } from '@/utils/leifsbackend-api'

export default {
  components: {
    AdventureGallery, MapView
  },
  props: {
    eventData: {
      type: Object,
      required: false
    }
  },
  computed: {
    eventDuration: function() {
      let start = moment(this.startDate).format('DD.MM.YYYY');
      let end = moment(this.endDate).format('DD.MM.YYYY');

      return `${ start } - ${ end }`
    }
  },
  data() {
    return {
      showMap: false,
      mapboxData: undefined,
      id: undefined,
      title: undefined,
      locationName: undefined,
      startDate: undefined,
      endDate: undefined,
      subtext: undefined
    }
  },
  created() {
    const id = this.$route.params.id;
    console.log('id found', id);
    if (id) {
      adventureById(id)
        .then(this.setEventData(data))
    } else {
      this.setEventData(this.eventData)
    }
  },
  methods: {
    setEventData(event) {
      console.log('evnent', event)
      this.id = event.id;
      this.title = event.title;
      this.locationName = event.locationName;
      this.startDate = event.dateStart;
      this.endDate = event.dateEnd;
      this.subtext = event.subtext;
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/buttons.scss';

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

</style>