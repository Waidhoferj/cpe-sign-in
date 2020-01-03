<template>
  <div class="meeting-card">
    <header>
      <img src alt />
      <h3 class="label">{{ label }}</h3>
      <h2 class="subject">{{ subject }}</h2>
    </header>
    <div class="description">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
      voluptatum ipsam sunt, quod quaerat harum! Eaque ipsum blanditiis
      assumenda pariatur culpa quas facilis nemo vel, facere asperiores
      reiciendis hic unde.
    </div>
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
    img: {
      default: "img"
    }
  }
};
</script>

<style lang="scss">
.meeting-card {
  background: var(--card);
  border-radius: 7px;
  width: 100%;
  header {
    text-align: center;
    padding: 20px 10px;
  }
  .description {
    background: white;
    padding: 15px;
    border-radius: 7px;
    padding: 20px;
  }
}
</style>
