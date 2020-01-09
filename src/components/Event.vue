<template>
  <li class="event" @click="openEvent">
    <img src="@/assets/calendar.svg" />
    <span class="date">{{ date }}</span>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </li>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String
    },
    date: {
      required: true,
      type: String
    },
    description: String,
    link: String
  },
  methods: {
    openEvent() {
      if (this.link) window.open(this.link, "_blank");
    }
  }
};
</script>

<style lang="scss">
.event {
  margin: 7px 2px;
  border-radius: 7px;
  padding: 10px;
  background: white;
  transition: transform 0.5s;
  cursor: pointer;

  &:active {
    transform: scale(0.97);
  }
}
</style>
