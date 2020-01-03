<template>
  <div class="page overview-page">
    <header class="welcome-message">
      <img src="@/assets/cpe-logo.svg" />
      <h1>Welcome</h1>
      <p>
        We have an awesome meeting planned for you! Scroll down to learn more!
      </p>
    </header>
    <div class="content">
      <div class="spacer"></div>
      <!-- v-for with v-ifs checking each type of data pulled -->
      <meeting-card
        label="tonights meeting"
        subject="Speaker"
        description="hi"
      ></meeting-card>
      <action-caller></action-caller>
    </div>
  </div>
</template>

<script>
import MeetingCard from "@/components/MeetingCard";
import ActionCaller from "@/components/ActionCaller";
import UpcomingEvents from "@/components/UpcomingEvents";
export default {
  components: {
    MeetingCard,
    UpcomingEvents,
    ActionCaller
  }
};
</script>

<style lang="scss">
.overview-page {
  color: var(--dark);

  .welcome-message {
    color: white;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 500px;
  }
  .content {
    z-index: 5;
  }

  .spacer {
    height: 100vh;
    width: 100%;
  }
}
</style>
