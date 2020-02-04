<template functional>
  <div class="card meeting-card">
    <header>
      <img :src="props.image" alt />
      <h3 class="label">{{ props.label }}</h3>
      <h2 class="subject">{{ props.subject }}</h2>
    </header>
    <div class="panel">
      <p class="description">{{props.description}}</p>
      <div class="resources">
        <a
          class="resource"
          v-for="{url, label} in props.resources"
          :href="url"
          :key="label"
          @click="$options.methods.logInteraction(props.subject, label)"
          target="_blank"
        >{{label}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { analytics } from "@/modules/firebase";
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
    image: String,
    resources: Array
  },
  methods: {
    logInteraction(subject, label) {
      analytics.logEvent("resource_accessed", {
        element_name: "Meeting Card",
        subject,
        link_title: label
      });
    }
  }
};
</script>


