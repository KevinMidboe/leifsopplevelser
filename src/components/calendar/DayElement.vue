<template>
  <div class="calendar--day" @click="$emit('click')">
    <div 
      class="calendar--date" 
      v-bind:style="{ color: color }"
      v-bind:class="{'currentDay': day.currentDay}">

    {{ day.date }}
  </div>

    <div v-if="day.events.length" v-for="event in day.events" class="calendar--event">
      {{ event.title }}
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
      }
    }
  },
  created() {
    this.setColor()
  },
  methods: {
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
  &--day {
    border: 0.5px solid rgba(0,0,0,.2);
    min-height: 2rem;
    
    @media screen and (min-width: 400px) {
      min-height: 4rem;
    }

    @media screen and (min-width: 1100px) {
      min-height: 5.6rem;
    }

    &:hover {
      cursor: pointer;
    }
  }

  &--date {
    display: inline-block;

    text-align: right;
    float: right;
    margin-top: .6rem;
    margin-right: .6rem;
    font-weight: 600;
    font-size: 0.95rem;
  }

  & .currentDay {
    background-color: #cb0b0b;
    border-radius: 50%;
    height: 21px;
    width: 24px;
    margin-top: 0.35rem;
    padding-top: 0.35rem;
    margin-right: 0.3rem;
    padding-right: 0.2rem;
    color: ghostwhite !important;
  }

  &--event {
    margin: 0.5rem;
    font-size: 0.8rem;
    width: 100%;

    @media screen and (max-width: 400px) {
      font-size: unset;
    }
  }
}
</style>