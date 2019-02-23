<template>
  <div class="parent">

    <div class="container">
      <h1 class="slipping-left">registrer en ny opplevelse</h1>
      
      <!-- {{ formData }} -->
      <event-form v-if="notWaitingForFormdata || formData" :formData="formData"></event-form>
    </div>

    <!-- <div class="image-grid">
      <grid-layout
        ref="imageGrid"
        :layout.sync="layout"
        :colNum="3"
        :rowHeight="rowHeight"
        :responsive="true"
        :cols="grid.cols"
        :breakpoints="grid.breakpoints"
        :autoSize="true"
        :is-draggable="reorder"
        :is-resizable="false"
        :is-mirrored="false"
        :margin="[10, 10]"
        :use-css-transforms="true">

        <grid-item class="grid-item" v-for="item in layout"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i">
        
          <div v-bind:style="{ 'background-image': 'url(' + item.img + ')' }">
            <span>{{item.i}}</span>
          </div>
        </grid-item>
      </grid-layout>
    </div> -->

<!--     
    <div class="tools">
      <button class="button" @click="reorder = !reorder" v-bind:class="{ active: reorder }">{{reorder ? 'submit' : 'reoder' }}</button>
    </div> -->
    <!-- {{ reorder }} -->

  </div>
</template>

<script>
import axios from 'axios'
import VueGridLayout from 'vue-grid-layout';
import ClickOutside from 'vue-click-outside'
import EventForm from './EventForm'

export default {
  components: { 
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    EventForm: EventForm
  },
  computed: {
    rowHeight: function() {
      if (this.imageGrid)
        return this.grid.rows[this.imageGrid.lastBreakpoint]
      return 150
    },
    notWaitingForFormdata: function() {
      if (this.$route.query.id) {
        return false;
      }
      return true;
    }
  },
  data() {
    return {
      formData: undefined,
      timeout: undefined,
      features: [],
      showAutocompleted: false,
      selectedPlace: undefined,
      imageGrid: undefined,
      title: '',
      dateStart: '',
      dateEnd: '',
      subtext: '',
      location: undefined,
      files: [],
      reorder: false,
      grid: {
        cols: { lg: 6, md: 5, sm: 4, xs: 3, xxs: 2 },
        rows: { lg: 216, md: 240, sm: 280, xs: 250, xxs: 150 },
        breakpoints: { lg: 1200, md: 996, sm: 800, xs: 600, xxs: 0 }
      },
      layout: [
        {"x":0,"y":0,"w":1,"h":1,"i":"0",img:"https://upload.wikimedia.org/wikipedia/commons/f/f9/Obama_portrait_crop.jpg"},
        {"x":1,"y":0,"w":1,"h":1,"i":"1",img:"https://api.kevinmidboe.com/files/images/DSC_9029.JPG"},
        {"x":2,"y":0,"w":1,"h":1,"i":"2"},

        {"x":3,"y":0,"w":1,"h":1,"i":"3"},
        {"x":4,"y":0,"w":1,"h":1,"i":"4"},
        {"x":5,"y":0,"w":1,"h":1,"i":"5"},

      // {"x":4,"y":0,"w":1,"h":3,"i":"2"},
      // {"x":6,"y":0,"w":1,"h":3,"i":"3"},
      // {"x":8,"y":0,"w":1,"h":3,"i":"4"},
      // {"x":10,"y":0,"w":1,"h":3,"i":"5"},

      // {"x":0,"y":1,"w":1,"h":3,"i":"6"},
      // {"x":2,"y":1,"w":1,"h":3,"i":"7"},
      // {"x":4,"y":1,"w":1,"h":3,"i":"8"},
      // {"x":6,"y":1,"w":1,"h":3,"i":"9"},
      // {"x":8,"y":1,"w":1,"h":3,"i":"10"},
      // {"x":10,"y":1,"w":1,"h":3,"i":"11"},
      
      // {"x":0,"y":2,"w":1,"h":3,"i":"12"},
      // {"x":2,"y":2,"w":1,"h":3,"i":"13"},
      // {"x":4,"y":2,"w":1,"h":3,"i":"14"},
      // {"x":6,"y":2,"w":1,"h":3,"i":"15"},
      // {"x":8,"y":2,"w":1,"h":3,"i":"16"},
      // {"x":10,"y":2,"w":1,"h":3,"i":"17"},
      
      // {"x":0,"y":3,"w":1,"h":3,"i":"18"},
      // {"x":2,"y":3,"w":1,"h":3,"i":"19"}
  ]
    }
  },
  watch: {
    location: function(newVal, preVal) {      
      console.log('input changed')
      let place = this.selectedPlace ? this.selectedPlace.place_name_no : false

      if (place !== newVal) {
        this.debounce(this.call)
      }
    }
  },
  created() {
    const id = this.$route.query.id
    if (id) {
      this.fetchById(id)
    }
  },
  mounted() {
    this.imageGrid = this.$refs.imageGrid;
  },
  methods: {
    fetchById(id) {
      fetch('http://localhost:5000/api/adventure/' + id)
      .then(resp => resp.json())
      .then(data => {
        this.formData = data;
        console.log('data', data)
      })
    },

    processForm: function() {
      let data = {
        title: this.title,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        subtext: this.subtext,
        locationName: this.location,
        geoposition: this.selectedPlace.geometry.coordinates,
        mapboxData: this.selectedPlace
      }

      fetch('http://localhost:5000/api/adventure', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      // axios.post('localhost:5000/api/adventure', {
      //   body: JSON.stringify(data)
      // })
      .then((resp) => console.log('response from posting to server:', resp))
      .catch((error) => console.error('error from post request:', error))
    },
    processFile(event) {
      this.files = event.target.files;
      console.log('files', this.files)
    },
    gridSettings() {
      let breakpoint = this.$refs.imageGrid.lastBreakpoint;
      let currentColCount = this.grid.cols[breakpoint];
      console.log('gridSetting', breakpoint, currentColCount, this.$refs.imageGrid)
    },
    debounce(fn, time=1000) {
      const functionCall = () => fn.apply(this, arguments);
      
      clearTimeout(this.timeout);
      this.timeout = setTimeout(functionCall, time);
    },
    choosePlace(place) {
      console.log('Chooosen');
      this.location = place.place_name_no;
      this.selectedPlace = place;
      this.showAutocompleted = false;
    },
    hide() {
      this.showAutocompleted = false;
    },
    show() {
      this.showAutocompleted = true;
    },
    call() {
      axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.location}.json`, {
        params: {
          access_token: 'pk.eyJ1Ijoia2V2aW5taWRib2UiLCJhIjoiY2pydWhlamQyMHJ2NTRhdGN1em5ndXVyMyJ9.Ejdo_3iuuGOD662Bh6es4w',
          autocomplete: true,
          language: 'no'
        }

      })
      .then((resp) => {
        this.features = resp.data.features;
        this.showAutocompleted = true;
      })
      console.log('CALLING')
    }
  },
  directives: {
    ClickOutside
  }
}
</script>

<style lang="scss" scoped>
  .tools {
    position: fixed;
    bottom: 1rem;
    right: 1rem;

    > button {
      border: 2.5px solid #c91119;
      background-color: white;
      color: #c91119;

      &:hover, &:active, &:focus, &.active {
        color: white;
        background-color: #c91119;
      }
    }
  }

  .image-grid {
    max-width: 1445px;
  }

  .grid-layout {
    width: 100vw;

  }

  .grid-item {
    // background-image: url('https://cdn1.thr.com/sites/default/files/imagecache/list_square_270x270/2018/10/joe_rogan-getty-headshot-2018.jpg');
    
    background-color: NavajoWhite;

    font-size: 3rem;
    color: blue;

    > div > span {
      display: inline-block;
      position: absolute;
    }

    > div, > div > img {
      // background-image: url('');
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
      height: inherit;
      width: inherit;
      // max-height: 50vh;
    }
  }


  .parent {
    // background-color: green;

    display: block;
    width: 70vw;
    margin: 4rem auto;

    @media screen and (max-width: 650px) {
      margin: 4rem 1rem;
      width: unset;
    }
  }

</style>