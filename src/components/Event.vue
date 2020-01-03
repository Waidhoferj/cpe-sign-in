<template>
  <li class="event">
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
    date: Date,
    description: String
  }
};
</script>

<style lang="scss">
.event {
}
</style>
