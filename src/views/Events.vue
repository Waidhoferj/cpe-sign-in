<template>
  <div class="events">
    <div class="dash">
      <header>
        <h1>Events</h1>
        <button class="toggle" @click="showEventTable = !showEventTable">{{toggleButtonText}}</button>
      </header>
      <event-table v-if="showEventTable" :events="events" @delete="deleteEvent"></event-table>
      <event-creator v-else @created="updateTable"></event-creator>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import { db } from "@/modules/firebase";
import EventCreator from "@/components/EventCreator";
import EventTable from "@/components/EventTable";
export default {
  components: {
    EventCreator,
    EventTable
  },
  data() {
    return {
      showEventTable: true,
      events: []
    };
  },
  computed: {
    toggleButtonText() {
      return this.showEventTable ? "New" : "Existing";
    }
  },
  methods: {
    async getEvents() {
      let now = firebase.firestore.Timestamp.fromDate(new Date());
      let records = await db
        .collection("events")
        .where("endTime", ">", now)
        .get();
      records.forEach(record => {
        let id = record.id;
        let data = record.data();
        data.id = id;
        this.events.push(data);
      });
    },
    async deleteEvent(index) {
      let id = this.events[index].id;
      this.events.splice(index, 1);
      try {
        await db
          .collection("events")
          .doc(id)
          .delete();
      } catch (err) {
        alert(err.message);
      }
    },
    updateTable(event) {
      this.events.push(event);
      this.showEventTable = true;
    }
  },

  mounted() {
    this.getEvents();
  }
};
</script>

<style lang="scss">
.events {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .dash {
    width: 95%;
    max-width: 950px !important;
    height: 700px;
    padding: 20px;
    border-radius: 7px;
    background: white;
    max-width: 100%;
    header {
      padding: 20px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h1 {
        color: var(--accent);
      }
      .toggle {
        padding: 10px 15px;
        color: var(--accent);
        border: 1px solid var(--accent);
        background: transparent;
        margin: 0;
      }
    }
  }
}
</style>
