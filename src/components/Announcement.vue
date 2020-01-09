<template>
  <div class="announcement">
    <header>
      <img v-if="icon" :src="icon" class="icon" />
      <img v-if="image" :src="image" class="image" />
      <h2 class="title">{{title}}</h2>
    </header>
    <p class="description">{{description}}</p>
    <div class="resources">
      <a class="resource" v-for="{url, label} in resources" :href="url" :key="label">{{label}}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String
    },
    description: {
      required: true,
      type: String
    },
    image: {
      required: false,
      type: String
    },
    icon: {
      required: false,
      type: String
    },
    resources: Array
  }
};
</script>

<style lang="scss">
.announcement {
  width: 100%;
  border-radius: 7px;
  background: white;
  header {
    text-align: center;
    padding: 20px 10px;

    .icon {
      width: 70px;
      height: 70px;
      margin-bottom: 12px;
    }
    .image {
      width: 100%;
      height: 200px;
      border-radius: 7px;
    }
  }

  .description {
    width: 90%;
    margin: auto;
  }

  .resources {
    width: 50%;
    margin: auto;
    padding: 20px 0;
    .resource {
      display: block;
      margin: 10px 0;
      padding: 10px 20px;
      border-radius: 7px;
      text-align: center;
      color: white;
      background: var(--dark);
      margin: auto;
      text-decoration: none;
      cursor: pointer;
      border-radius: 7;
      margin: auto;
    }
  }
}
</style>