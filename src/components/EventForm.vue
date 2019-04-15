<template>
  <div>
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
            fra dato (dd-mm-yyyy)
          </label>
        </div>

        <div class="field last-name">
          <label class="caption">
            <input v-model="dateEnd" type="date" spellcheck="false" maxlength="30" :tabindex="3">
            til dato (dd-mm-yyyy)
          </label>
        </div>
      </fieldset>

      <form-element-location @newLocation="setLocation" :inputLocation="formData"></form-element-location>

      <div class="form-item">
        <label class="title">love letter <span class="required">*</span></label>
        
        <textarea v-model="subtext"></textarea>
      </div>


      <form-element-upload @newFiles="setFiles" :adventureId="adventureId"></form-element-upload>


  <!--         <div class="form-button-wrapper form-button-wrapper--align-left">
        <button class="button sqs-system-button sqs-editable-button" @click="gridSettings">Settings</button>
      </div> -->


      <div class="hidden form-submission-text">Thank you!</div>

      <div class="hidden form-submission-html" data-submission-html=""></div>

    </form>

    <div>
      <button class="button" @click="processForm">Legg til</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ClickOutside from 'vue-click-outside'
import FormElementLocation from './form/FormElementLocation'
import FormElementUpload from './form/FormElementUpload'
import { dateToDayMonthYearDashed } from '@/utils/dates'

import { createAdventure } from '@/utils/leifsbackend-api'

export default {
  components: {
    FormElementLocation,
    FormElementUpload
  },
  props: {
    formData: {
      type: Object,
      required: false,
      default: undefined
    }
  },
  data() {
    return {
      adventureId: undefined,
      title: undefined,
      dateStart: undefined,
      dateEnd: undefined,
      chosenLocation: undefined,
      chosenFiles: undefined,
      subtext: undefined,
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
  beforeMount() {
    const formData = this.formData || this.$route.params.formData;
    
    console.log('formData', formData)
    if (formData) {
      this.adventureId = formData.id;
      this.title = formData.title;
      this.dateStart = dateToDayMonthYearDashed(formData.dateStart);
      this.dateEnd = dateToDayMonthYearDashed(formData.dateEnd);
      this.chosenLocation = formData.locationName;
      this.subtext = formData.subtext;
    }
  },
  methods: {
    setLocation(location) { this.chosenLocation = location },
    setFiles(files) { this.chosenFiles = files },
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
      console.log('Processing form to post to backend with data', data)


      createAdventure(data)
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