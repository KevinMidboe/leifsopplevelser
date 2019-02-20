<template>
  <div class="form-item required" style="overflow: hidden">
    <!-- {{ highlightedLocation }} -->

    <label class="title">sted<span class="required">*</span></label>
    <input 
      v-model="locationInput" 
      @keyup.down="highlightNext" 
      @keyup.enter="getMapboxPlaces"
      @click="show"
      :tabindex="4"
      ref="listInput"
      type="text">

    <ul class="field-autocompleted" v-click-outside="hide" v-if="showAutocompleted && resultMapboxLocations.length > 1">
        <!-- :style="{ selected: highlightedLocation === index }" -->
      <li 
        v-for="(location, index) in resultMapboxLocations"
        @click="locationSelected(location)"
        :tabindex="5 + index"
        @keyup.enter="locationSelected(location)"
        @keyup.down="highlightNext" 
        @keyup.up="highlightPrev"
        ref="listElement">
        
        {{ location.place_name_no }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import ClickOutside from 'vue-click-outside'

export default {
  data() {
    return {
      timeout: undefined,
      resultMapboxLocations: [],
      showAutocompleted: false,
      chosenLocation: undefined,
      locationInput: undefined,
      highlightedLocation: -1
    }
  },
  watch: {
    locationInput: function(newVal, preVal) {
      if (newVal === '') {
        this.resultMapboxLocations = []
        return
      }      
      console.log('input changed')
      let place = this.chosenLocation ? this.LocationName : false

      if (place !== newVal) {
        this.debounce(this.getMapboxPlaces)
      }
    }
  },
  computed: {
    LocationName() {
      return this.chosenLocation ? this.chosenLocation.place_name_no : undefined;
    },
    tabIndex(index) {
      return 4 + index;
    }
  },
  methods: {
    highlightNext() {
      let curr = this.highlightedLocation;
      const max = this.resultMapboxLocations.length -1;

      if (curr < max) {
        curr++
        console.log('curr', curr, this.$refs.listElement[curr])
        this.$refs.listElement[curr].focus({preventScroll: true})

        this.highlightedLocation = curr;
        return 
      }

      this.$refs.listInput.focus({preventScroll: true})
      this.highlightedLocation = -1;
    },
    highlightPrev() {
      let curr = this.highlightedLocation;

      if (curr > 0) {
        curr--
        console.log('curr', curr, this.$refs.listElement[curr])
        this.$refs.listElement[curr].focus()

        this.highlightedLocation = curr;
        return
      }
      
      this.$refs.listInput.focus()
      this.highlightedLocation = -1;
    },
    debounce(fn, time=1000) {
      const functionCall = () => fn.apply(this, arguments);
      
      clearTimeout(this.timeout);
      this.timeout = setTimeout(functionCall, time);
    },
    locationSelected(place) {
      console.log('Chosen');
      this.chosenLocation = place;
      this.locationInput = this.LocationName
      this.showAutocompleted = false;
      this.$emit('newLocation', place)
    },
    hide() {
      this.showAutocompleted = false;
    },
    show() {
      this.showAutocompleted = true;
    },
    getMapboxPlaces() {
      axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.locationInput}.json`, {
        params: {
          access_token: 'pk.eyJ1Ijoia2V2aW5taWRib2UiLCJhIjoiY2pydWhlamQyMHJ2NTRhdGN1em5ndXVyMyJ9.Ejdo_3iuuGOD662Bh6es4w',
          autocomplete: true,
          language: 'no'
        }

      })
      .then((resp) => {
        this.resultMapboxLocations = resp.data.features;
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

.field-autocompleted {
  width: calc(100% - 1.26rem);
  position: absolute;
  padding: 0;
  margin: 0;
  margin-top: -6px;
  background-color: white;

  li {
    list-style: none;
    height: 2.3rem;
    line-height: 2.3rem;
    padding-left: 0.5rem;
    white-space: nowrap;
    overflow: hidden;

    &:hover, &:focus {
      background-color: #e6e6e6;
      cursor: pointer;
    }
  }
  
  border-color: rgb(204, 204, 204);
  border-radius: 2px;
  border-style: solid;
  border-width: 1px;

  & .selected {
    background-color: #e6e6e6;
  }
}

</style>