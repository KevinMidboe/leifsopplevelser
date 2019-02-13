<template>
  <div class="parent">
    <h1 class="slipping-left">registrer en ny opplevelse</h1>

    <div class="container">
      <div class="cont2">
        <div class="form-item required">
          <label class="title" for="email2-field">Tittel <span class="required">*</span></label>
          <input class="field-element" name="email" x-autocompletetype="email" type="email" spellcheck="false">
        </div>

        <fieldset class="form-item fields required">
          <div class="title">Dato <span class="required">*</span></div>
          <div class="field first-name">
            <label class="caption"><input class="field-element field-control" name="fname" x-autocompletetype="given-name" type="date" spellcheck="false" maxlength="30" data-title="First">
                    Fra Dato</label>
          </div>

          <div class="field last-name">
            <label class="caption"><input class="field-element field-control" name="lname" x-autocompletetype="surname" type="date" spellcheck="false" maxlength="30" data-title="Last">
            Til Dato</label>
          </div>
        </fieldset>

        <div class="form-item required">
          <label class="title" for="text3-field">Sted<span class="required">*</span></label>
          <input class="field-element" v-model="locationInput" v-on:keydown.enter.prevent @click="show" type="text">

          <ul class="field-autocompleted" v-click-outside="hide" v-if="showAutocompleted && features.length > 1">
            <li v-for="result in features" @click="choosePlace(result)">{{ result.place_name_no }}</li>
          </ul>
        </div>

        <div class="form-item field textarea required">
          <label class="title" for="textarea4-field">love letter <span class="required">*</span></label>
          
          <textarea class="field-element "></textarea>
        </div>

        <div class="form-button-wrapper form-button-wrapper--align-left">
          <input class="button sqs-system-button sqs-editable-button" type="submit" value="Legg til">
        </div>

        <input id="file-upload" type="file" multiple>

        <div class="hidden form-submission-text">Thank you!</div>

        <div class="hidden form-submission-html" data-submission-html=""></div>

      </div>
    </div>



     <!--    <div style="
          width: 100%;
          height: 5rem;
          border: 1px solid red;
          margin-bottom: 1rem;
          margin-left: -0.5rem;
          padding-right: 0.5rem;
        ">

        </div> -->

  </div>
</template>

<script>
import axios from 'axios'
import ClickOutside from 'vue-click-outside'

export default {
  components: { },
  data() {
    return {
      locationInput: undefined,
      timeout: undefined,
      features: [],
      showAutocompleted: false,
      selectedPlace: undefined
    }
  },
  watch: {
    locationInput: function(newVal, preVal) {      
      console.log('input changed')
      let place = this.selectedPlace ? this.selectedPlace.place_name_no : false

      if (place !== newVal) {
        this.debounce(this.call)
      }
    }
  },
  created() {},
  beforeMount() {},
  methods: {
    debounce(fn, time=1000) {
      const functionCall = () => fn.apply(this, arguments);
      
      clearTimeout(this.timeout);
      this.timeout = setTimeout(functionCall, time);
    },
    choosePlace(place) {
      console.log('Chooosen');
      this.locationInput = place.place_name_no;
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
      axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.locationInput}.json`, {
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
  .parent {
    display: block;
    width: max-content;
    margin: 4rem auto;

    @media screen and (max-width: 650px) {
      margin: 4rem 1rem;
      width: unset;
    }
  }


  .container {
    color: rgba(0, 0, 0, 0.701961);
    display: block;
    // margin: 0 auto;
    font-family: 'Proxima Nova';
    margin-top: 3rem;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    height: 502px;
    letter-spacing: normal;
    line-height: 22.399999618530273px;
    padding-right: 0px;
    width: 100%;
    max-width: 612px;
  }

  .cont2 {
    box-shadow: rgba(128, 128, 128, 0) 0px 0px 0px 1px inset;
    clear: both;
    color: rgba(0, 0, 0, 0.701961);
    display: block;
    font-family: 'Proxima Nova';
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    height: 485px;
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
  }

  .form-item {
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

    .field-autocompleted {
      // width: 591.8px;
      width: calc(100% - 1.26rem);
      // height: 200px;
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


  .button {
    -webkit-appearance: none;
    -webkit-backface-visibility: none;
    background-color: rgb(39, 39, 39);
    border-color: rgb(39, 39, 39);
    border-style: outset;
    border-width: 0px;
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