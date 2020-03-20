<template>
  <div>
    <h1>Summary</h1>

    <div v-for="event in events" class="list-item">
      <router-link :to="{ name: 'EditEvent', query: { id: event.id }}">

        <h2>{{event.title}}</h2>
        <p>{{ dateToDayMonthYear(event.dateStart) }} - {{ dateToDayMonthYear(event.dateEnd) }}</p>
        <p>{{ event.locationName}}</p>
        <p>{{ event.subtext }}</p>
        <!-- {{ event }} -->
      </router-link>
    </div>
  </div>
</template>

<script>
import { dateToDayMonthYear } from '@/utils/dates'

export default {
  props: {
    events: {
      type: Array,
      required: false
    }
  },
  methods: {
    dateToDayMonthYear(date) { return dateToDayMonthYear(date) }
  }
}
</script>

<style lang="scss" scoped>
  p {
    margin-bottom: 0.7rem;
  }

  .list-item {
    margin-bottom: 3rem;
    padding: 0.2rem;
    width: 100%;
    border: 1px solid transparent;

    &:hover {
      border: 1px solid black;
    }
  }
</style>