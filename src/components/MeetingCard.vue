<template>
  <div class="meeting-card">
    <header>
      <img src alt />
      <h3></h3>
      <h2>meeting.title</h2>
    </header>
    <section class="description">{{ meeting.description }}</section>
  </div>
</template>

<script>
export default {
  props: {
    meeting: Object
  },
  computed() {},
  methods: {
    getContent() {
      this.$prismic.client.getSingle("overview").then(document => {
        this.title = document.data.title;
        this.fields.logo = document.data.logo;
        this.fields.richContent = document.data.rich_content;
      });
    }
  },
  created() {
    this.getContext();
  }
};
</script>

<style lang="scss"></style>
