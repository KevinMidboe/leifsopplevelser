<template>
  <div class="map" v-if="mapboxData">
    {{ mapboxData.center }}
    <mapbox
      :access-token="accessToken"
      :map-options="options"
      @map-init="mapInitialized"
      @map-load="setLocationMarker"></mapbox>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import Mapbox from 'mapbox-gl-vue';
import { locationByName } from '@/utils/leifsbackend-api'

export default {
  components: { Mapbox },
  props: {
    locationName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      marker: undefined,
      map: undefined,
      mapboxData: undefined,
      options: undefined,

      accessToken: undefined
    }
  },
  async created() {
    console.log('created')
    const response = await locationByName(this.locationName);
    const mapData = response.mapboxData;
    
    this.setupMap(mapData)
    this.mapboxData = mapData;
  },
  methods: {
    setupMap(mapData) {
      console.log('mapData', mapData)
      const mapCenter = mapData.center;
      this.options = {
          style: 'mapbox://styles/kevinmidboe/cjrvwyoft1tij1ftb94f75lqs',
          sprite: 'mapbox://styles/kevinmidboe/cjrvwyoft1tij1ftb94f75lqs',
          zoom: 10,
          center: mapCenter,
          minZoom: 0,
          maxZoom: 18
      }
    },
    mapInitialized(map) { this.map = map },
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