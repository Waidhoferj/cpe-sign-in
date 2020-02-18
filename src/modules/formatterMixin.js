/**
 * Formats CMS data pulled from prismic
 */
export default {
  methods: {
    /**
     * Formats Overview page slices into a cleaner form
     * @param sections {Array} Prismic Slices from the Overview Page
     * @returns formatted page content
     */
    formatSections(sections) {
      let sectionFormatters = {
        meeting_info: this.formatMeeting,
        upcoming_events: this.formatEvents,
        announcement: this.formatAnnouncement,
        call_to_action_footer: this.formatCtaFooter
      };
      return sections.reduce((page, section) => {
        page.push(sectionFormatters[section.slice_type](section));
        return page;
      }, []);
    },

    formatMeeting(meeting) {
      let content = meeting.primary;
      return {
        image: content.image.url,
        label: content.label.length ? content.label[0].text : "",
        subject: content.subject[0].text,
        description: content.description.map(line => line.text).join("\n"),
        resources: meeting.items.map(resource => ({
          label: resource.link_title[0].text,
          url: resource.link.url
        })),
        type: meeting.slice_type
      };
    },

    formatEvents(content) {
      let events = content.items.map(event => {
        let date = event.date || "";
        if (date) {
          date = new Date(event.date);
          date.setDate(date.getDate() + 1);
          date = date.toDateString().slice(4, 10);
        }
        return {
          title: event.title[0].text,
          date,
          description: event.description ? event.description[0].text : "",
          link: event.link.url
        };
      });
      return {
        events,
        type: content.slice_type
      };
    },

    formatAnnouncement(announcement) {
      let content = announcement.primary;
      let resources = announcement.items.reduce((data, link) => {
        if (link.link_title.length && link.resource.url)
          data.push({ label: link.link_title[0].text, url: link.resource.url });
        return data;
      }, []);
      return {
        image: content.image.url,
        title: content.title[0].text,
        description: content.description.map(line => line.text).join("\n"),
        resources,
        type: announcement.slice_type
      };
    },

    formatCtaFooter(content) {
      return {
        actions: content.items.map(({ action }) => action[0].text),
        type: content.slice_type
      };
    }
  }
};
