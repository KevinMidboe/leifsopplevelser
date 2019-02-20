<template>
  <div>
    <div class="form">
      <router-link to="edit">
        <button class="button" type="submit">Rediger</button>
      </router-link>
    </div>

    <div class="gallery">
      <div class="gallery--header">
        <h1>Topptur til gaustadtoppen æøå {{ id }}</h1>
        <div class="gallery--info">
          <p>{{ eventDate.from }} - {{ eventDate.until }}</p>
          <p>{{ eventLocation }}. <a href="#">Se kart</a></p>

          <p>{{ subtext }}</p>
        </div>
      </div>

      <!-- <map-view :cords="cords"></map-view> -->
      <!-- <calendar></calendar> -->

      <gallery :short="false"></gallery>
    </div>
  </div>
</template>

<script>
import Gallery from '@/components/Gallery'
import Calendar from '@/components/Calendar'

export default {
  components: {
    Gallery, Calendar
  },
  props: ['id'],
  data() {
    return {
      eventLocation: 'Oslo, Gardermoen, Norge',
      startDate: undefined,
      endDate: undefined,
      subtext: 'On November 1, 2018, we embarked on our tour with Triathalon. Thank you so much to everyone who came to see us, for buying our merch, for saying hello after the shows, to the amazing hard-working people at the venues, and of course to our team + Live Nation, Ones to Watch, for booking us on our favorite tour this year. And thank you to Claud, Girl Ultra and Kevin Krauter for playing these shows with us. \n\n Here are some of our favorite moments captured by one of our favorite people, Meghan Cummings (@meghancummings). '
    }
  },
  computed: {
    eventDate: function() {
      return { 
        from: this.startDate || '28.09.18',
        until: this.endDate || '12.10.19'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.gallery {
  // padding: 2.1rem;

  &--header {
    padding-bottom: 1rem;
    // background-color: NavajoWhite;
  }

  &--info {
    font-size: 15px;
    line-height: 1.6rem;
    letter-spacing: 0rem;
    color: rgba(0, 0, 0, .8);

    &:first-of-type {
      margin-top: 0.8rem;
    }

    a {
      font-family: 'Ambroise std demi';
      font-style: normal;

      &:visited {
        color: #3b70a2;
      }
    }
  }

  &--subtext {
    font-size: 15px;
    line-height: 1.6rem;
    letter-spacing: 0rem;
    color: rgba(0, 0, 0, .8);
  }
}

.form {
  display: absolute;
  float: right;
  margin-top: 1rem;
  margin-right: 1rem;

}
.button {
  -webkit-appearance: none;
  -webkit-backface-visibility: none;
  border: 2.5px solid #c91119;
  border-radius: 3px;
  // color: rgb(255, 255, 255);
  background-color: white;
  color: #c91119;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  height: 42px;
  letter-spacing: 1px;
  line-height: 14px;
  margin-left: -10px;
  padding: 0 1rem;
  text-transform: uppercase;
  transition-delay: 0s;
  transition-duration: 0.1s;
  transition-property: opacity;
  transition-timing-function: linear;
  vertical-align: baseline;
  white-space: pre;
  writing-mode: horizontal-tb;

  &:hover, &:active, &:focus {
    color: white;
    background-color: #c91119;
  }
}
</style>