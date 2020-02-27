<template>
  <div class="event-creator">
    <form class="event-form">
      <p>Name:</p>
      <input v-model="name" type="text" class="name-input" placeholder="Meeting 1" />
      <p>Subject:</p>
      <input v-model="subject" type="text" class="name-input" placeholder="Guest Speaker" />
      <p>Category:</p>
      <select v-model="type" @input="autofill" class="category-select">
        <option value="meeting">Meeting</option>
        <option value="event">Event</option>
      </select>
      <p>Date:</p>
      <input v-model="date" type="date" class="event-date" pattern="\d{4}-\d{2}-\d{2}" />
      <p>Start Time:</p>
      <input v-model="startTime" type="time" class="start-time" />
      <p>End Time:</p>
      <input v-model="endTime" type="time" class="end-time" />
    </form>
    <button class="create-event" ref="eventButton" @click="createEvent">Create Event</button>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import { animateEl } from "@/modules/animate";
import { db } from "@/modules/firebase";
import firebase from "firebase/app";
export default {
  data() {
    return {
      name: "",
      subject: "",
      type: "",
      date: "",
      startTime: "",
      endTime: ""
    };
  },
  methods: {
    async createEvent() {
      this.$v.$touch();
      if (this.$v.$error) return animateEl(this.$refs.eventButton, "shake");
      let eventDate = new Date(this.date);
      eventDate.setDate(eventDate.getDate() + 1);
      let startTime = new Date(eventDate.getTime());
      startTime.setHours(this.startTime.split(":")[0]);
      let endTime = new Date(eventDate.getTime());
      endTime.setHours(this.endTime.split(":")[0]);
      let event = {
        name: this.name,
        subject: this.subject,
        type: this.type,
        startTime: firebase.firestore.Timestamp.fromDate(startTime),
        endTime: firebase.firestore.Timestamp.fromDate(endTime),
        reviews: []
      };
      try {
        var { id } = await db.collection("events").add(event);
      } catch (err) {
        return alert(err.message);
      }
      event.id = id;
      this.$emit("created", event);
    },
    autofill(event) {
      this.type = event.target.value;
      if (event.target.value !== "meeting") return;
      this.date = this.getNextTuesday();
      this.startTime = "18:00:00";
      this.endTime = "19:00:00";
    },
    getNextTuesday() {
      let dif = 2 - new Date().getDay();
      let daysTilTuesday = dif < 0 ? 7 + dif : dif;
      let nextTuesday = new Date();
      nextTuesday.setDate(nextTuesday.getDate() + daysTilTuesday);
      return `${nextTuesday.getFullYear()}-${(nextTuesday.getMonth() + 1)
        .toString()
        .padStart(2, 0)}-${nextTuesday
        .getDate()
        .toString()
        .padStart(2, 0)}`;
    }
  },
  validations: {
    name: {
      required
    },
    subject: {
      required
    },
    type: {
      required
    },
    date: {
      required
    },
    startTime: {
      required
    },
    endTime: {
      required
    }
  }
};
</script>

<style lang="scss">
.event-creator {
  position: relative;
  width: 100%;
  height: 100%;
  .event-form {
    display: grid;
    grid-template-columns: 0.7fr 1fr;
    column-gap: 15px;
    align-items: center;
    p {
      font-size: 20px;
      font-weight: 500;
      color: var(--dark);
      text-align: right;
    }
    input,
    select {
      background: #f3f3f3;
      padding: 10px 20px;
      font-size: 17px;
      border-radius: 7px;
      border: 1px solid var(--dark);
      margin: none;
      text-align: left;
      margin-left: 0;
      width: 250px;
      max-width: 90%;
    }

    @media screen and (max-width: 500px) {
      input,
      select {
        font-size: 14px;
        width: 200px;
      }

      p {
        font-size: 17px;
      }
    }
  }

  .create-event {
    background: #f48865;
    border: none;
    padding: 15px 30px;
    color: white;
    margin: 25px auto;
  }
}
</style>
