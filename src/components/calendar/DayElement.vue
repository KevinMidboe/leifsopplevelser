<template>
  <div class="calendar--day" @click="clickedEvent(null)" v-bind:class="{ empty: day.events.length === 0 }">
    <div
      class="calendar--date" 
      v-bind:style="{ color: color }"
      v-bind:class="{'currentDay': day.currentDay}">

      {{ day.date }}
    </div>

    <div v-if="day.events.length > 0" v-for="(event, index) in day.events" class="calendar--event">
      <span class="calendar--event-title" v-bind:style="{ backgroundColor: eventColors[index] }" @click="clickedEvent(event.id)">{{ eventColors[index] + event.title }}</span>
    </div>
  </div>
</template>

<script>

export default {
  props: { 
    day: {
      type: Object,
      required: true,
      deep: true
    },
  },
  watch: {
    day: function() {
      this.setColor()
    }
  },
  data() {
    return {
      color: undefined,
      states: {
        'before': 'silver',
        'current': 'black',
        'after': 'dimgray',
        'event': '#cb0b0b'
      },
      eventColors: ['orange', 'green', 'blue' ],
      eventClicked: false
    }
  },
  created() {
    this.setColor()
  },
  methods: {
    clickedEvent(id) {
      if (this.eventClicked) return

      if (id) {
        this.eventClicked = true;
        this.$router.push({ name: 'EditEvent', query: { id } })
      } else {
        this.$router.push({ name: 'EditEvent', params: { formData: {
          title: undefined,
          dateStart: this.day.m,
          dateEnd: undefined,
          locationName: undefined,
          subtext: undefined
        } } })
      }

    },
    setColor() {
      if (this.day.events.length) {
        this.color = this.states['event']
      }
      else {
        this.color = this.states[this.day.relativeDay]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  .empty {
     @media screen and (max-width: 400px) {
      display: none;
    }
  }

  &--day {
    border: 0.5px solid rgba(0,0,0,.2);
    min-height: 6rem;
    min-width: 6rem;
  }

  &--date {
    width: 100%;
    float: right;
    text-align: right;
    margin-top: .6rem;
    margin-right: .6rem;
    margin-bottom: .6rem;
    font-weight: 600;
    font-size: 0.95rem;
    
    @media screen and (max-width: 400px) {
      width: unset;
      float: left;
      margin-left: 0.5rem;
    }
  }

  & .currentDay {
    background-color: #cb0b0b;
    border-radius: 50%;
    height: 21px;
    width: 21px;
    margin-top: 0.35rem;
    padding-top: 0.32rem;
    margin-right: 0.32rem;
    padding-right: 0.35rem;
    color: ghostwhite !important;
  }

  &--event {
    margin: 0.3rem 0;

    &:hover {
      cursor: pointer;
    }

    &-title {
      margin: 0 0.5rem;
      padding: 0.15rem 0.3rem;
      font-size: 0.95rem;
      text-transform: capitalize;
      background-color: #d71514;
      color: white;
      display: flex;
      border-radius: 2px;
    }

    @media screen and (max-width: 400px) {
      font-size: unset;
    }
  }
}
</style>