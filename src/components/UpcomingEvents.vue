<template>
  <div class="upcoming-events">
    <header>
      <img src="@/assets/rocket.svg" />
      <h2>Upcoming Events</h2>
    </header>
    <ul class="events">
      <event
        v-for="event in events"
        :title="event.title"
        :description="event.description"
        :date="event.date"
        :key="event.title"
      >
      </event>
    </ul>
  </div>
</template>

<script>
import Event from "@/components/Event";
export default {
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  components: {
    Event
  }
};
</script>

<style lang="scss">
.upcoming-events {
  background: var(--card);
  .events {
    list-style: none;
    padding: 10px 5px;
  }
}
</style>
