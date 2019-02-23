<template>
  <div class="map">
    {{ mapboxData.center }}
    <mapbox
      :access-token="accessToken"
      :map-options="options"
      @map-init="mapInitialized"
      @map-load="mapLoaded"></mapbox>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import Mapbox from 'mapbox-gl-vue';

export default {
  components: { Mapbox },
  props: {
    mapboxData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      marker: undefined,
      map: undefined,

      accessToken: "pk.eyJ1Ijoia2V2aW5taWRib2UiLCJhIjoiY2pydWhlamQyMHJ2NTRhdGN1em5ndXVyMyJ9.Ejdo_3iuuGOD662Bh6es4w",
      options: {
          style: 'mapbox://styles/kevinmidboe/cjrvwyoft1tij1ftb94f75lqs',
          sprite: 'mapbox://styles/kevinmidboe/cjrvwyoft1tij1ftb94f75lqs',
          center: this.mapboxData.center,
          zoom: 10,
          minZoom: 0,
          maxZoom: 18
      }
    }
  },
  methods: {
    mapInitialized(map) { this.map = map },
    mapLoaded() {
      this.setLocationMarker()
    },
    setLocationMarker() {
       if(this.marker != undefined) this.marker.remove();

      this.marker = new mapboxgl.Marker()
        .setLngLat(this.mapboxData.center)
        .addTo(this.map);
    }
  }
}
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 50vh;
}
</style>