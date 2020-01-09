<template>
  <div class="page overview-page">
    <header class="welcome-message" :class="{ hide: headerHidden }">
      <img src="@/assets/cpe-logo.svg" />
      <h1>Welcome</h1>
      <p>We have an awesome meeting planned for you! Scroll down to learn more!</p>
    </header>
    <div class="content">
      <div class="spacer"></div>
      <meeting-card
        ref="meetingCard"
        v-bind="content.meeting_info"
        v-waypoint="{
          active: true,
          callback: fadeHeader,
          options: intersectionOptions
        }"
      ></meeting-card>

      <upcoming-events :events="content.upcoming_events"></upcoming-events>
      <announcement v-bind="content.announcement"></announcement>
      <!-- <img v-if="" src="" alt=""> -->
      <action-caller :actions="content.call_to_action_footer"></action-caller>
    </div>
  </div>
</template>

<script>
import MeetingCard from "@/components/MeetingCard";
import UpcomingEvents from "@/components/UpcomingEvents";
import Announcement from "@/components/Announcement";
import ActionCaller from "@/components/ActionCaller";

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
      /**
       * Information fetched from the CMS to present on the page
       */
      content: {
        meeting_info: {
          subject: "test",
          label: "test",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi blanditiis sint quisquam vitae fugiat exercitationem, nisi animi assumenda dolorum suscipit voluptates nam velit placeat quod repellendus illum quam rem veniam!",
          img: ""
        },
        upcoming_events: [],
        announcement: {
          title: "test",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi blanditiis sint quisquam vitae fugiat exercitationem, nisi animi assumenda dolorum suscipit voluptates nam velit placeat quod repellendus illum quam rem veniam!",
          image: "",
          icon: "",
          resources: []
        },
        call_to_action_footer: ["test", "tost"]
      },
      headerHidden: false,
      intersectionOptions: {
        root: null,
        rootMargin: "-150px 0px -100px 0px",
        threshold: [0]
      }
    };
  },
  methods: {
    async getContent() {
      let response;
      try {
        response = await this.$prismic.client.query(
          this.$prismic.Predicates.at("document.type", "overview"),
          { orderings: "[my.event.date desc]" }
        );
      } catch (err) {
        return console.error(err);
      }
      let sections = response.results[0].data.body;
      this.content = this.formatSections(sections);
      console.log(this.content);
    },
    fadeHeader({ going, direction }) {
      if (going === "in" && direction === "top") this.headerHidden = true;
      else if (going === "out" && direction === "bottom")
        this.headerHidden = false;
    },
    checkHeaderState() {
      this.headerHidden =
        this.$refs.meetingCard.$el.getBoundingClientRect().y -
          window.innerHeight <
        0;
    }
  },
  mounted() {
    this.getContent().then(() => this.checkHeaderState());
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

    &.hide {
      opacity: 0;
    }
  }
  .content {
    z-index: 5;
  }

  .spacer {
    height: 110vh;
    width: 100%;
  }
}
</style>
