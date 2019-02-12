<template>
  <div class="parent">
    <h1>opprett nytt arrangement</h1>

<div class="container">
  <div class="cont2" data-block-type="9">
    <div class="sqs-block-content">
      <div class="form-wrapper">
        <div class="form-inner-wrapper">
          <form>
            <div class="field-list clear">
              <div class="form-item field email required">
                <label class="title" for="email2-field">Tittel <span class="required">*</span></label>
                
                <input class="field-element" name="email" x-autocompletetype="email" type="email" spellcheck="false">
              </div>    

              <fieldset class="form-item fields name required">
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

           
              <div class="form-item field text required">
                <label class="title" for="text3-field">Sted<span class="required">*</span></label>
                
                <input class="field-element text" v-model="locationInput" @click="show" type="text">

                <ul class="field-autocompleted" v-click-outside="hide" v-if="showAutocompleted && features.length > 1">
                  <li v-for="result in features" @click="choosePlace(result)">{{ result.place_name_no }}</li>
                </ul>
              </div>

<!--               <div class="form-item field textarea required">
                <label class="title" for="textarea4-field">love letter <span class="required">*</span></label>
                
                <textarea class="field-element "></textarea>
              </div> -->

        </div> 
      <div class="form-button-wrapper form-button-wrapper--align-left">
        <input class="button sqs-system-button sqs-editable-button" type="submit" value="Legg til">
      </div>

      <div class="hidden form-submission-text">Thank you!</div>

      <div class="hidden form-submission-html" data-submission-html=""></div>
    </form>

  </div>

</div>
</div></div></div>
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
    margin: 4rem 1rem;
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
    padding-bottom: 17px;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 0px;
    position: relative;
    transition-delay: 0s;
    transition-duration: 0.2s;
    transition-property: box-shadow;
    transition-timing-function: ease-in-out;
  }

  .form-item {
    border-bottom-color: rgba(0, 0, 0, 0.701961);
    border-bottom-style: none;
    border-bottom-width: 0px;
    border-image-outset: 0px;
    border-image-repeat: stretch;
    border-image-slice: 100%;
    border-image-source: none;
    border-image-width: 1;
    border-left-color: rgba(0, 0, 0, 0.701961);
    border-left-style: none;
    border-left-width: 0px;
    border-right-color: rgba(0, 0, 0, 0.701961);
    border-right-style: none;
    border-right-width: 0px;
    border-top-color: rgba(0, 0, 0, 0.701961);
    border-top-style: none;
    border-top-width: 0px;
    color: rgba(0, 0, 0, 0.701961);
    display: block;
    font-family: 'Proxima Nova';
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    height: 110px;
    letter-spacing: normal;
    line-height: 17px;
    margin-bottom: 0px;
    margin-left: -11.625px;
    margin-right: 0px;
    margin-top: 0px;
    min-width: min-content;
    padding-bottom: 0px;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 0px;

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
      color: rgba(0, 0, 0, 0.701961);
      display: block;
      float: left;
      font-family: 'Proxima Nova';
      font-size: 14px;
      font-style: normal;
      font-weight: 300;
      height: 69px;
      letter-spacing: normal;
      line-height: 17px;
      margin-bottom: 24px;
      margin-right: 0px;
      margin-top: 0px;
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
        color: rgba(0, 0, 0, 0.701961);
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

        &:hover {
          background-color: #e6e6e6;
          cursor: pointer;
        }
      }
      
      border-bottom-color: rgb(204, 204, 204);
      border-bottom-left-radius: 2px;
      border-bottom-right-radius: 2px;
      border-bottom-style: solid;
      border-bottom-width: 1px;
      border-image-outset: 0px;
      border-image-repeat: stretch;
      border-image-slice: 100%;
      border-image-source: none;
      border-image-width: 1;
      border-left-color: rgb(204, 204, 204);
      border-left-style: solid;
      border-left-width: 1px;
      border-right-color: rgb(204, 204, 204);
      border-right-style: solid;
      border-right-width: 1px;
      border-top-color: rgb(204, 204, 204);
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
      border-top-style: solid;
      border-top-width: 1px;
    }

    & input {
      -webkit-appearance: none;
      -webkit-rtl-ordering: logical;
      -webkit-user-select: text;
      background-attachment: scroll;
      background-clip: border-box;
      background-color: rgb(250, 250, 250);
      background-image: none;
      background-origin: padding-box;
      background-size: auto;
      border-bottom-color: rgb(204, 204, 204);
      border-bottom-left-radius: 2px;
      border-bottom-right-radius: 2px;
      border-bottom-style: solid;
      border-bottom-width: 1px;
      border-image-outset: 0px;
      border-image-repeat: stretch;
      border-image-slice: 100%;
      border-image-source: none;
      border-image-width: 1;
      border-left-color: rgb(204, 204, 204);
      border-left-style: solid;
      border-left-width: 1px;
      border-right-color: rgb(204, 204, 204);
      border-right-style: solid;
      border-right-width: 1px;
      border-top-color: rgb(204, 204, 204);
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
      border-top-style: solid;
      border-top-width: 1px;
      box-sizing: border-box;
      color: rgb(0, 0, 0);
      cursor: auto;
      display: inline-block;
      font-family: sans-serif;
      font-size: 14px;
      font-style: normal;
      font-variant-caps: normal;
      font-weight: normal;
      height: 42px;
      letter-spacing: normal;
      line-height: 16px;
      margin-bottom: 4px;
      margin-left: 0px;
      margin-right: 0px;
      margin-top: 6px;
      padding-bottom: 12px;
      padding-left: 12px;
      padding-right: 12px;
      padding-top: 12px;
      text-align: start;
      text-indent: 0px;
      text-shadow: none;
      text-transform: none;
      vertical-align: baseline;

      width: 100%;
      word-spacing: 0px;
      writing-mode: horizontal-tb;
    }
  }


  .button {
    -webkit-appearance: none;
    -webkit-backface-visibility: none;
    background-color: rgb(39, 39, 39);
    border-bottom-color: rgb(39, 39, 39);
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom-style: outset;
    border-bottom-width: 0px;
    border-image-outset: 0px;
    border-image-repeat: stretch;
    border-image-slice: 100%;
    border-image-source: none;
    border-image-width: 1;
    border-left-color: rgb(39, 39, 39);
    border-left-style: outset;
    border-left-width: 0px;
    border-right-color: rgb(39, 39, 39);
    border-right-style: outset;
    border-right-width: 0px;
    border-top-color: rgb(39, 39, 39);
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-top-style: outset;
    border-top-width: 0px;
    // box-sizing: border-box;
    color: rgb(255, 255, 255);
    cursor: pointer;
    // display: inline-block;
    font-family: proxima-nova, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-variant-caps: normal;
    font-weight: 600;
    height: 42px;
    letter-spacing: 1px;
    line-height: 14px;
    margin-left: -10px;
    outline-color: rgb(255, 255, 255);
    outline-style: none;
    outline-width: 0px;
    padding: auto;
    text-align: center;
    text-decoration: none;
    text-indent: 0px;
    text-shadow: none;
    text-transform: uppercase;
    transition-delay: 0s;
    transition-duration: 0.1s;
    transition-property: opacity;
    transition-timing-function: linear;
    vertical-align: baseline;
    white-space: pre;
    width: 126.859375px;
    word-spacing: 0px;
    writing-mode: horizontal-tb;
  }
</style>