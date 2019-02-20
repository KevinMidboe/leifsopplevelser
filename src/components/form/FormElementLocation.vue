<template>
  <div class="form-item required" style="overflow: hidden">
    {{ highlightedLocation }}

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
.form {
  box-shadow: rgba(128, 128, 128, 0) 0px 0px 0px 1px inset;
  clear: both;
  color: rgba(0, 0, 0, 0.701961);
  letter-spacing: normal;
  line-height: 22.399999618530273px;
  outline-color: rgba(0, 0, 0, 0.701961);
  outline-style: none;
  outline-width: 0px;
  padding: 0px 15px 17px;
  position: relative;
  transition-delay: 0s;
  transition-duration: 0.2s;
  transition-property: box-shadow;
  transition-timing-function: ease-in-out;


  &-item {
    border-width: 0px;
    color: rgba(0, 0, 0, 0.701961);
    display: block;
    font-family: 'Proxima Nova';
    font-size: 14px;
    line-height: 17px;
    margin: 0 0 1rem -12px;
    min-width: min-content;
    padding: 0px;

    & .title {
      color: rgba(0, 0, 0, 0.701961);
      display: block;
      font-family: 'Proxima Nova';
      font-size: 14px;
      font-style: normal;
      font-weight: 300;
      height: 17px;
      letter-spacing: normal;
      line-height: 17px;
    }

    & .field {
      display: block;
      float: left;
      // margin-bottom: 24px;
      position: relative;
      width: 290.9375px;

      @media screen and (max-width: 650px) {
        max-width: 40vw;
        min-width: 120px;
      }

      &:last-of-type {
        margin-left: 11px;
      }

      & .caption {
        cursor: pointer;
        display: inline;
        font-family: 'Proxima Nova';
        font-size: 12px;
        font-style: normal;
        font-weight: 300;
        height: auto;
        letter-spacing: normal;
        line-height: 14px;
      }
    }
  }

  & input {
    -webkit-appearance: none;
    -webkit-rtl-ordering: logical;
    -webkit-user-select: text;
    background-color: rgb(250, 250, 250);

    border: 1px solid rgb(204, 204, 204);
    border-radius: 3px;
    border-image-outset: 0px;
    border-image-repeat: stretch;
    border-image-slice: 100%;
    border-image-source: none;
    border-image-width: 1;
    box-sizing: border-box;
    cursor: auto;
    display: inline-block;
   
    height: 42px;
    font-family: 'Proxima Nova';
    letter-spacing: normal;
    font-size: 14px;
    line-height: 16px;
    margin: 6px 0 4px;
    padding: 12px;

    width: 100%;
  }

  & textarea {
    -webkit-appearance: none;
    -webkit-rtl-ordering: logical;
    -webkit-user-select: text;
    border-color: rgb(204, 204, 204);
    border-left-radius: 2px;
    border-right-radius: 2px;
    border-style: solid;
    border-width: 1px;

    font-family: 'Proxima Nova';
    letter-spacing: normal;
    font-size: 14px;

    box-sizing: border-box;

    line-height: 14px;
    margin: 6px 0px 4px;
    min-height: 100px;
    overflow-x: auto;
    overflow-y: auto;
    padding: 12px;
    resize: vertical;
    text-align: start;
    text-indent: 0px;
    text-shadow: none;
    text-transform: none;
    vertical-align: top;
    white-space: pre-wrap;
    width: 100%;
    word-spacing: 0px;
    word-wrap: break-word;
    writing-mode: horizontal-tb;
  }
}

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



.button {
  -webkit-appearance: none;
  -webkit-backface-visibility: none;
  background-color: rgb(39, 39, 39);
  border-color: rgb(39, 39, 39);
  border-style: outset;
  border-width: 0px;
  border-radius: 3px;
  color: rgb(255, 255, 255);
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  height: 42px;
  letter-spacing: 1px;
  line-height: 14px;
  margin-left: -10px;
  padding: 0 1rem;
  text-align: center;
  text-decoration: none;
  text-shadow: none;
  text-transform: uppercase;
  transition-delay: 0s;
  transition-duration: 0.1s;
  transition-property: opacity;
  transition-timing-function: linear;
  vertical-align: baseline;
  white-space: pre;
  writing-mode: horizontal-tb;
}

</style>