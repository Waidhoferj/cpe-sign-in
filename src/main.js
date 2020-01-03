import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuelidate from "vuelidate";
import PrismicVue from "prismic-vue";
import linkResolver from "./link-resolver";

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
