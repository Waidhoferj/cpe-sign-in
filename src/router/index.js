import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "../views/SignIn.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "signIn",
    component: SignIn
  },
  {
    path: "/sign-up",
    name: "signUp",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "signIn" */ "../views/SignUp.vue")
  },
  {
    path: "/brief",
    name: "brief",
    component: () =>
      import(/* webpackChunkName: "overview" */ "../views/Brief.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
