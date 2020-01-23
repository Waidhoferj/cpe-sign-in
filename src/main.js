import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuelidate from "vuelidate";
window.prismic = {
  endpoint: "https://cpe-sign-in.cdn.prismic.io/api/v2"
};
import PrismicVue from "prismic-vue";
import linkResolver from "./link-resolver";
import VueWaypoint from "vue-waypoint";

// Waypoint plugin
Vue.use(VueWaypoint);

// Add this before the new Vue instance
Vue.use(PrismicVue, {
  endpoint: window.prismic.endpoint,
  linkResolver
});

Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
