<template>
  <div class="gallery">
    <div class="gallery--header">
      <h1>Topptur til gaustadtoppen æøå {{ id }}</h1>
      <p class="gallery--info">{{ eventDate.from }} - {{ eventDate.until }}</p>
      <p class="gallery--info">{{ eventLocation }}. <a href="#">Se kart</a></p>
    </div>

    <!-- <map-view :cords="cords"></map-view> -->
    <gallery></gallery>
  </div>
</template>

<script>
import Gallery from '@/components/Gallery'

export default {
  components: {
    Gallery
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
  },
  created() {},
  beforeMount() {
    console.log('routes', this.$router, this.id)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.gallery {
  margin: 2.1rem;

  &--header {
    padding-bottom: 4rem;
    // background-color: NavajoWhite;
  }

  &--info {
    font-family: 'proxima-nova-thin';
    font-weight: 300;
    font-style: normal;
    font-size: 18px;
    line-height: 1.6rem;
    letter-spacing: 0rem;
    color: rgba(0, 0, 0, .7);

    &:first-of-type {
      margin-top: 0.8rem;
    }
  }
}
</style>