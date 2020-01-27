<template>
  <div class="action-caller">
    <h2>Now Go</h2>
    <h3
      class="current-action"
      ref="currentAction"
      v-waypoint="{ active: true, callback: onIntersection, options: intersectionOptions }"
    >{{ action }}</h3>
    <h3 class="next-action" ref="nextAction">{{ nextAction }}</h3>
  </div>
</template>

<script>
import { animateEl } from "@/modules/animate";
export default {
  props: {
    actions: {
      required: true,
      type: Array,
      default: []
    }
  },
  data() {
    return {
      index: 0,
      actionInterval: -1,
      intersectionOptions: {
        root: null,
        rootMargin: "0px 0px 0px 0px",
        threshold: [0]
      }
    };
  },
  computed: {
    action() {
      return this.actions[this.index];
    },
    nextAction() {
      return this.actions[(this.index + 1) % this.actions.length];
    }
  },
  methods: {
    cycleActions() {
      clearInterval(this.actionInterval);
      this.actionInterval = setInterval(this.incrementAction, 3000);
    },
    async incrementAction() {
      animateEl(this.$refs.currentAction, "exit");
      await animateEl(this.$refs.nextAction, "enter");
      this.index = (this.index + 1) % this.actions.length;
    },
    onIntersection({ going, direction }) {
      if (going === this.$waypointMap.GOING_IN && this.actions.length > 1)
        this.cycleActions();
      else clearInterval(this.actionInterval);
    }
  }
};
</script>

<style lang="scss">
.action-caller {
  margin: auto;
  padding: 30px 0;
  text-align: center;
  color: white;
  background: var(--accent);

  .current-action {
    &.exit {
      animation: exit 1s ease-in-out forwards;
    }
  }

  .next-action {
    position: relative;
    transform: translateY(-100%);
    pointer-events: none;
    opacity: 0;

    &.enter {
      animation: enter 1s ease-in-out forwards;
    }
  }

  @keyframes enter {
    0%,
    20% {
      transform: scale(0.8) translateY(-100%);
      opacity: 0;
    }
    to {
      transform: scale(1) translateY(-100%);
      opacity: 1;
    }
  }

  @keyframes exit {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }
}
</style>
