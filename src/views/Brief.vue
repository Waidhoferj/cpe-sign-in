<template>
  <div class="page overview-page">
    <img src="@/assets/back-icon.svg" alt="log out" class="back" @click="logOut" />
    <header class="welcome-message">
      <img src="@/assets/cpe-logo.svg" />
      <h1>Welcome {{ user ? user.displayName :"" }}</h1>
      <div class="message" :class="{show: contentLoaded}">
        <p>We have an awesome meeting planned for you! Scroll down to learn more!</p>
        <img class="arrow" src="@/assets/arrow.svg" />
      </div>
    </header>
    <div v-if="contentLoaded" class="content">
      <div class="spacer"></div>
      <div class="section" v-for="card in content">
        <meeting-card v-if="card.type == 'meeting_info'" v-bind="card"></meeting-card>
        <upcoming-events v-if="card.type == 'upcoming_events'" v-bind="card"></upcoming-events>
        <announcement v-if="card.type == 'announcement'" v-bind="card"></announcement>
      </div>

      <!-- <img v-if="" src="" alt=""> -->
      <action-caller v-if="actions.length" :actions="actions"></action-caller>
    </div>
  </div>
</template>

<script>
import MeetingCard from "@/components/MeetingCard";
import UpcomingEvents from "@/components/UpcomingEvents";
import Announcement from "@/components/Announcement";
import ActionCaller from "@/components/ActionCaller";
import { auth, db } from "@/modules/firebase";
import firebase from "firebase/app";
import Formatter from "@/modules/formatterMixin";
export default {
  components: {
    MeetingCard,
    UpcomingEvents,
    Announcement,
    ActionCaller
  },
  mixins: [Formatter],
  data() {
    return {
      user: auth.currentUser,
      /**
       * Information fetched from the CMS to present on the page
       */
      content: []
    };
  },
  computed: {
    contentLoaded() {
      return this.content.length > 0;
    },
    actions() {
      let lastEl = this.content[this.content.length - 1];
      return lastEl.type == "call_to_action_footer" ? lastEl.actions : [];
    }
  },
  methods: {
    async getContent() {
      let response;
      try {
        response = await this.$prismic.client.query(
          this.$prismic.Predicates.at("document.type", "overview"),
          { orderings: "[document.last_publication_date desc]" }
        );
      } catch (err) {
        return console.error(err);
      }
      let sections = response.results[0].data.body;
      this.content = this.formatSections(sections);
    },
    logOut() {
      auth.signOut();
      this.$router.push("/login");
    }
  },
  mounted() {
    this.getContent();
  }
};
</script>

<style lang="scss">
.overview-page {
  color: var(--dark);

  .content {
    max-width: 600px;
  }

  .welcome-message {
    color: white;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 500px;
    pointer-events: none;
    transition: opacity 0.7s;

    .message {
      transition: all 1.5s;
      opacity: 0;
      transform: translateY(30px);
      &.show {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .arrow {
      margin-top: 40px;
      animation: float 5s infinite ease-in-out;
      @keyframes float {
        0%,
        100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(10px);
        }
      }
    }
  }
  .content {
    z-index: 2;
  }

  .spacer {
    pointer-events: none;
    height: 110vh;
    width: 100%;
  }

  .section {
    padding: 20px 0;
    background: var(--accent);
  }

  .hide {
    opacity: 0;
  }
}
</style>
