<template>
  <div>
    <div class="gallery">
      <div class="gallery--header">
        <h1>Topptur til gaustadtoppen æøå {{ id }}</h1>
        <p class="gallery--info">{{ eventDate.from }} - {{ eventDate.until }}</p>
        <p class="gallery--info">{{ eventLocation }}. <a href="#">Se kart</a></p>
      </div>

      <!-- <map-view :cords="cords"></map-view> -->
      <!-- <calendar></calendar> -->

      <gallery :short="false"></gallery>
    </div>
  </div>
</template>

<script>
import Gallery from '@/components/Gallery'
import Calendar from '@/components/Calendar'

export default {
  components: {
    Gallery, Calendar
  },
  props: ['id'],
  data() {
    return {
      eventLocation: 'Oslo, Gardermoen, Norge',
      startDate: undefined,
      endDate: undefined
    }
  },
  computed: {
    eventDate: function() {
      return { 
        from: this.startDate || '28.09.18',
        until: this.endDate || '12.10.19'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.popover {
  width: 100%;
  height: 100vh;
  position: absolute;
  background-color: rgba(0,0,0,0.7);
}

.gallery {
  padding: 2.1rem;

  &--header {
    padding-bottom: 4rem;
    // background-color: NavajoWhite;
  }

  &--info {
    font-family: 'Proxima Nova';
    font-weight: 300;
    font-style: italic;
    font-size: 18px;
    line-height: 1.6rem;
    letter-spacing: 0rem;
    color: rgba(0, 0, 0, .7);

    &:first-of-type {
      margin-top: 0.8rem;
    }

    a {
      font-family: 'Ambroise std demi';
      font-style: normal;

      &:visited {
        color: #3b70a2;
      }
    }
  }
}
</style>