<template>
  <div class="meeting-card">
    <header>
      <img v-if="image" :src="image" alt />
      <h3 class="label">{{ label }}</h3>
      <h2 class="subject">{{ subject }}</h2>
    </header>
    <div class="description">{{description}}</div>
  </div>
</template>

<script>
export default {
  props: {
    subject: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: "Tonight's Meeting"
    },
    description: {
      type: String,
      required: true
    },
    image: String
  }
};
</script>

<style lang="scss">
.meeting-card {
  background: var(--card);
  border-radius: 7px;
  width: 100%;
  margin: 20px, auto;
  header {
    text-align: center;
    padding: 20px 10px;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
  }
  .description {
    background: white;
    padding: 15px;
    border-radius: 7px;
    padding: 20px;
  }
}
</style>
