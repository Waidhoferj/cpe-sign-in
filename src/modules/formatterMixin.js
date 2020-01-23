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
        page[section.slice_type] = sectionFormatters[section.slice_type](
          section
        );
        return page;
      }, {});
    },

    formatMeeting(meeting) {
      let content = meeting.primary;
      return {
        image: content.image.url,
        label: content.label.length ? content.label[0].text : "",
        subject: content.subject[0].text,
        description: content.description[0].text
      };
    },

    formatEvents(events) {
      let formatDateString = str => {
        let months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec"
        ];
        let date = new Date(str);
        return `${
          months[date.getMonth()]
        } ${date.getDate()} ${date.getFullYear()}`;
      };
      return events.items.map(event => ({
        title: event.title[0].text,
        date: event.date ? formatDateString(event.date) : "",
        description: event.description ? event.description[0].text : "",
        link: event.link.url
      }));
    },

    formatAnnouncement(announcement) {
      let content = announcement.primary;
      let resources = announcement.items.reduce((data, link) => {
        if (link.link_title.length && link.resource.url)
          data.push({ label: link.link_title[0].text, url: link.resource.url });
        return data;
      }, []);
      return {
        icon: content.icon.url,
        image: content.image.url,
        title: content.title[0].text,
        description: content.description[0].text,
        resources
      };
    },

    formatCtaFooter(cta) {
      return cta.items.map(({ action }) => action[0].text);
    }
  }
};
