<template>
  <div class="container">
    <div class="header--inline">

      <h1>{{ month }} {{ year }}</h1>

      <!-- {{ short }}  if longlist we want to keep printing vertically  -->

      <div class="navigation">
        <button @click="decrement">{{ previousMonth }}</button>
        <button @click="reset">Today</button>
        <button @click="increment">{{ nextMonth }}</button>
      </div>
    </div>


    <div class="calendar">
      <div v-for="dayName in days" class="calendar--dayName">{{ dayName }}</div>
      <div v-for="(day, index) in cal">
        <day-element :key="index" :day="day" @click="clickedDay(day)"></day-element>
      </div>

    </div>

    <div v-if="long">
      <month-summary :events="eventsFound"></month-summary>
    </div>

  </div>
</template>

<script>
import DayElement from '@/components/calendar/DayElement'
import MonthSummary from '@/components/calendar/MonthSummary'
import moment from 'moment'

import { adventureList } from '@/utils/leifsbackend-api'

export default {
  components: { DayElement, MonthSummary },
  props: {
    long: {
      default: true,
      type: Boolean,
    }
  },
  computed: {
    previousMonth: function() {
      return moment().add(this.offset - 1, 'month').format('MMMM')
    },
    nextMonth: function() {
      return moment().add(this.offset + 1, 'month').format('MMMM')
    }
  },
  data() {
    return {
      days: ['man', 'tir', 'ons', 'tor', 'fre', 'lør', 'søn'],
      offset: 0,
      cal: [],
      eventsFound: [],
    }
  },
  beforeMount() {
    this.initCalendar()
  },
  methods: {
    clickedDay(day) {
      console.log('clicked', day)
      if (day.events.length) {
        this.$router.push({ name: 'EditEvent', query: { id: day.events[0].id } })
      } else {
        this.$router.push({name: 'EditEvent', params: { formData: {
          title: undefined,
          dateStart: day.m,
          dateEnd: undefined,
          locationName: undefined,
          subtext: undefined
        } } })
        // this.$router.push({ name: 'EditEvent' })
      }
    },
    initCalendar() {
      const currentMonth = moment().add(this.offset, 'month')
      const start = moment().add(this.offset, 'month').startOf('month')
      const end = moment().add(this.offset, 'month').endOf('month')

      this.startDate = start.subtract(start.day() - 1, 'days');
      this.endDate = end.day() === 0 ? end : end.add(7 - end.day(), 'days')

      this.month = currentMonth.format('MMMM')
      this.year = currentMonth.format('YYYY')
      this.currentMonth = currentMonth;

      this.generateCalendar()

      this.getEvents()
        .then(events => this.populateCalendar(events))
    },
    getEvents() {
      return adventureList()
        .then(events => {
          console.log('events', events)
          this.eventsFound = events;
          return events
        })
    },
    generateCalendar(dates) {
      console.log('got these dates', dates)
      this.cal = []
      let day = this.startDate;

      while (day < this.endDate) {
        if (day.isSame(this.currentMonth, 'month')) {
          this.cal.push(this.addDay(day, 'current'))
        } else if (day.isBefore(this.currentMonth, 'month')) {
          this.cal.push(this.addDay(day, 'before'))
        } else if (day.isAfter(this.currentMonth, 'month')) {
          this.cal.push(this.addDay(day, 'after'))
        }

        day.add(1, 'days')
      }

      console.log(this.cal)
    },
    populateCalendar(events) {
      const currentMonth = this.currentMonth;

      console.log('populateCalendar starting, cal content', this.cal)
      

      this.cal.forEach(day => {
        let m_day = moment(day.m);

        events.forEach(event => {
          if (m_day.isSame(moment(event.dateStart), 'day')) {
            day.events = [...day.events, event];

            console.log('day', day)
          }
        })
      })

      this.cal = JSON.parse(JSON.stringify(this.cal))
    },

    addDay(day, state) {
      return {
        name: day.format('dddd'),
        date: day.format('DD'),
        relativeDay: state,
        currentDay: moment().isSame(day, 'day'),
        events: [],
        m: day.format()
      }
    },

    increment() {
      this.offset++;
      this.initCalendar();
    },
    decrement() {
      this.offset--;
      this.initCalendar();
    },
    reset() {
      this.offset = 0
      this.initCalendar();
    }
  }
}
</script>

<style lang="scss" scoped>
.header--inline {
  display: flex;

  & .navigation {
    margin-left: auto;
    align-self: flex-end;
    margin-bottom: 1rem;
  }
}


h1 {
  margin-top: 40px;
  margin-bottom: 20px;
}

.navigation button{
  &:first-child, &:last-child {
    // padding: 0.1rem;
    // background-color: red;
    width: 4.5rem;
  }
}

.calendar {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  // height: 8rem;
  background-color: white;

  @media screen and (max-width: 400px) {
    grid-template-columns: 1fr;
    // width: calc(100% - 4rem);

    &--dayName {
      display: none;
    }
  }

  &--dayName {
    text-align: right;
    text-transform: capitalize;
    margin-bottom: 0.45rem;
    margin-right: 0.6rem;
  }
}
</style>