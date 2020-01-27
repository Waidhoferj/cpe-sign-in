import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "../views/SignIn.vue";
import { auth } from "@/modules/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: SignIn
  },
  {
    path: "/signup",
    name: "signUp",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "signIn" */ "../views/SignUp.vue")
  },
  {
    path: "/resetpassword",
    name: "resetPassword",
    component: () => import("../views/ForgotPassword.vue")
  },
  {
    path: "/brief",
    name: "brief",
    component: () =>
      import(/* webpackChunkName: "overview" */ "../views/Brief.vue")
  },
  {
    path: "/qrlogin/:qrcodeId",
    name: "qrCodeLogin",
    props: true,
    component: () => import("../views/QRCodeDisplay.vue")
  },
  {
    path: "/events",
    name: "events",
    props: true,
    component: () => import("../views/Events.vue")
  },
  {
    path: "*",
    name: "default",
    props: true,
    component: SignIn
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
