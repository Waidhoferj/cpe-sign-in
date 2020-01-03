<template>
  <div class="action-caller">
    <img src="@/assets/cpe-logo.svg" />
    <h2>Now Go</h2>
    <h3>{{ action }}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      actions: ["Test", "Learn", "Develop"],
      index: 0,
      actionInterval: -1
    };
  },
  computed: {
    action() {
      return this.actions[this.index];
    }
  },
  methods: {
    cycleActions() {
      return setInterval(() => {
        this.index = (this.index + 1) % this.actions.length;
      }, 2000);
    }
  },
  created() {
    //Mount an intersection observer
    this.actionInterval = this.cycleActions();
  },
  beforeDestroy() {
    clearInterval(this.actionInterval);
  }
};
</script>

<style lang="scss">
.action-caller {
  margin: 30px auto;
  text-align: center;
  color: white;
}
</style>
