<template functional>
  <div class="card announcement">
    <header>
      <img v-if="props.image" :src="props.image" class="image" />
      <h2 class="title">{{props.title}}</h2>
    </header>
    <p class="description">{{props.description}}</p>
    <div class="resources">
      <a
        class="resource"
        v-for="{url, label} in props.resources"
        :href="url"
        :key="label"
        @click="$options.methods.logInteraction(props.title, label)"
        target="_blank"
      >{{label}}</a>
    </div>
  </div>
</template>

<script>
import { analytics } from "@/modules/firebase";
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
    resources: Array
  },
  methods: {
    logInteraction(title, label) {
      analytics.logEvent("resource_accessed", {
        element_name: "Announcement",
        subject: title,
        link_title: label
      });
    }
  }
};
</script>

<style lang="scss">
.announcement {
  background: white;
  padding: 20px;
  header {
    text-align: center;
    padding: 20px 10px;
    .image {
      margin: auto;
      display: block;
      max-width: 100%;
      width: 400px;
      height: 200px;
      border-radius: 7px;
      object-fit: cover;
    }
  }
}
</style>