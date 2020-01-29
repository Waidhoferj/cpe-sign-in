<template>
  <div class="upcoming-events">
    <header>
      <img src="@/assets/rocket.svg" />
      <h2>Upcoming Events</h2>
    </header>
    <ul class="events">
      <event
        v-for="event in events"
        @click.native="logInteraction(event.title)"
        v-bind="event"
        :key="event.title"
      ></event>
    </ul>
  </div>
</template>

<script>
import Event from "@/components/Event";
import { analytics } from "@/modules/firebase";
export default {
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  components: {
    Event
  },
  methods: {
    logInteraction(label) {
      analytics.logEvent("resource_accessed", {
        element_name: "Event",
        link_title: label
      });
    }
  }
};
</script>

<style lang="scss">
.upcoming-events {
  margin: 20px auto;
  background: var(--card);
  border-radius: 7px;

  header {
    padding: 20px 10px;
    text-align: center;
  }
  .events {
    list-style: none;
    padding: 10px 5px;
    padding-top: 0;
  }
}
</style>
