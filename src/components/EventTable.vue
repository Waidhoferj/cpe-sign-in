<template>
  <table class="event-table">
    <tr class="header-row">
      <th class="name-header">Name</th>
      <th class="category-header">Category</th>
      <th class="date-header">Date</th>
      <th class="st-header">Start Time</th>
      <th class="et-header">End Time</th>
    </tr>
    <tr v-for="(event,i) in events" class="event-row" :key="event.id" @click="displayQR(event)">
      <td class="name">{{ event.name }}</td>
      <td class="category">{{ event.type }}</td>
      <td class="date">{{ event.startTime | getDate }}</td>
      <td class="start-time">{{ event.startTime | getTime }}</td>
      <td class="end-time">{{ event.endTime | getTime }}</td>
      <td class="delete-cell" @click.stop="$emit('delete', i)">delete</td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    events: Array
  },
  methods: {
    displayQR(event) {
      this.$router.push({
        path: `qrlogin/${event.id}`,
        query: { eventName: event.name, subject: event.subject }
      });
    }
  },
  filters: {
    getDate(timestamp) {
      let date = timestamp.toDate();
      return date.toDateString().slice(4, 10);
    },
    getTime(timestamp) {
      //TODO: mintues dont format correctly
      let dateString = timestamp.toDate().toLocaleTimeString();
      return dateString.slice(0, 4) + dateString.slice(7);
    }
  }
};
</script>

<style lang="scss">
.event-table {
  position: relative;
  width: 100%;
  color: var(--dark);
  table-layout: fixed;
  border-radius: 7px;
  border-collapse: collapse;

  .event-row {
    cursor: pointer;
    border-radius: 7px;
    height: 50px;
    border-bottom: 1px solid #b5c4cb;
    transition: background 0.7s;

    &:hover {
      background: #f9e9e3;
    }
  }
  .header-row {
    height: 30;
  }

  td {
    text-align: center;
  }
}

@media screen and (max-width: 700px) {
  .category-header {
    display: none;
  }
  td.category {
    display: none;
  }
}

@media screen and (max-width: 550px) {
  .et-header {
    display: none;
  }
  td.end-time {
    display: none;
  }
}
</style>
