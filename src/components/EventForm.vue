<template>
  <form class="form" @submit.prevent="">
  <!-- <form class="form" @submit.prevent="processForm"> -->
    <div class="form-item required">
      <label class="title">tittel <span class="required">*</span></label>
      <input class="field-element" v-model="title" type="text" :tabindex="1">
    </div>

    <fieldset class="form-item">
      <div class="title">dato <span class="required">*</span></div>
      <div class="field first-name">
        <label class="caption">
          <input v-model="dateStart" type="date" spellcheck="false" maxlength="30" :tabindex="2">
          fra dato
        </label>
      </div>

      <div class="field last-name">
        <label class="caption">
          <input v-model="dateEnd" type="date" spellcheck="false" maxlength="30" :tabindex="3">
          til dato
        </label>
      </div>
    </fieldset>

    <form-element-location @newLocation="setLocation"></form-element-location>

    <div class="form-item">
      <label class="title">love letter <span class="required">*</span></label>
      
      <textarea v-model="subtext"></textarea>
    </div>


    <form-element-upload @newFiles="setFiles"></form-element-upload>

    <div>
      <button class="button" type="submit">Legg til</button>
    </div>

<!--         <div class="form-button-wrapper form-button-wrapper--align-left">
      <button class="button sqs-system-button sqs-editable-button" @click="gridSettings">Settings</button>
    </div> -->


    <div class="hidden form-submission-text">Thank you!</div>

    <div class="hidden form-submission-html" data-submission-html=""></div>

  </form>
</template>

<script>
import axios from 'axios'
import ClickOutside from 'vue-click-outside'
import FormElementLocation from './form/FormElementLocation'
import FormElementUpload from './form/FormElementUpload'

export default {
  components: {
    FormElementLocation,
    FormElementUpload
  },
  data() {
    return {
      title: '',
      dateStart: '',
      dateEnd: '',
      chosenLocation: undefined,
      chosenFiles: undefined,
      subtext: '',
    }
  },
  computed: {
    LocationName() {
      return this.chosenLocation ? this.chosenLocation.place_name_no : undefined;
    },
    LocationGeoposition() {
      return this.chosenLocation ? this.chosenLocation.geometry.coordinates : undefined;
    }
  },
  methods: {
    setLocation(location) {
      console.log('detected location changed')
      console.log('inputLocation', location)
      this.chosenLocation = location;
    },
    setFiles(files) {
      this.chosenFiles = files;
    },
    processForm: function() {
      let data = {
        title: this.title,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        subtext: this.subtext,
        locationName: this.LocationName,
        geoposition: this.LocationGeoposition,
        mapboxData: this.chosenLocation
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
  }
}
  
</script>

<style lang="scss" scoped>


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