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

    <div class="form-item">
      <label class="title">last opp bilder</label>
      <input id="file-upload" type="file" @change="processFile" multiple>
      {{ files.length }}
    </div>

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

export default {
  components: {
    FormElementLocation
  },
  data() {
    return {
      title: '',
      dateStart: '',
      dateEnd: '',
      chosenLocation: undefined,
      subtext: '',
      files: [],
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
    setLocation(inputLocation) {
      console.log('detected location changed')
      console.log('inputLocation', inputLocation)
      this.chosenLocation = inputLocation;
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
    processFile(event) {
      this.files = event.target.files;
      console.log('files', this.files)
    },
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

    &:hover {
      background-color: #e6e6e6;
      cursor: pointer;
    }
  }
  
  border-color: rgb(204, 204, 204);
  border-radius: 2px;
  border-style: solid;
  border-width: 1px;
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