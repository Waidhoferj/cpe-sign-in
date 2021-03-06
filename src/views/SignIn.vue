<template>
  <div class="page log-in-page">
    <div class="content">
      <img src="@/assets/cpe-logo.svg" class="logo" />
      <h1 class="title">Sign In</h1>
      <form @submit.prevent="signIn">
        <text-field
          v-model.trim="email"
          @blur="$v.email.$touch()"
          label="Email"
          :invalid="$v.email.$error"
          errorMessage="must be at valid email"
        ></text-field>
        <text-field
          v-model.trim="password"
          @blur="$v.password.$touch()"
          label="Password"
          :invalid="$v.password.$error"
          errorMessage="must be at least 7 characters"
          type="password"
        ></text-field>
        <router-link class="forgot-password" to="resetpassword">forgot password</router-link>
        <input type="submit" value style="display: none" />
      </form>
      <div class="buttons">
        <button class="primary" ref="signInButton" @click="signIn">Log In</button>
        <button class="secondary" @click="$router.push('signUp')">Sign Up</button>
      </div>
    </div>
    <loader v-if="loading"></loader>
  </div>
</template>

<script>
import TextField from "@/components/TextField";
import Loader from "@/components/Loader";

import firebase from "firebase/app";
import { auth, db, analytics } from "@/modules/firebase";
import { required, minLength, email } from "vuelidate/lib/validators";
import { animateEl } from "@/modules/animate";
export default {
  name: "signIn",
  components: {
    TextField,
    Loader
  },
  props: {
    eventId: String,
    signedIn: Boolean
  },
  data() {
    return {
      email: "",
      password: "",
      loading: false
    };
  },
  watch: {
    /**
     * When signed in becomes true, the user is automatically logs in
     */
    signedIn: async function(signedIn) {
      if (!signedIn) return;
      if (this.eventId) this.logEventAttendance(this.eventId);
      analytics.logEvent("login", {
        event: this.eventId,
        automatic: true
      });
      this.$router.push("/brief");
    }
  },
  methods: {
    /**
     * Authenitcates user with Firebase using email and password
     */
    async signIn() {
      this.$v.$touch();
      if (this.$v.$error) return animateEl(this.$refs.signInButton, "shake");
      this.loading = true;

      try {
        const user = await auth.signInWithEmailAndPassword(
          this.email,
          this.password
        );
      } catch (err) {
        this.loading = false;
        alert(err.message);
        return;
      }
      analytics.logEvent("login", {
        event: this.eventId,
        automatic: false
      });
      this.loading = false;
    },
    /**
     * Logs user as an event attendee in Firebase
     */
    logEventAttendance(eventId) {
      return db
        .collection("users")
        .doc(auth.currentUser.uid)
        .update({
          eventsAttended: firebase.firestore.FieldValue.arrayUnion(eventId)
        });
    }
  },
  validations: {
    email: {
      email,
      required
    },
    password: {
      minLength: minLength(7),
      required
    }
  }
};
</script>

<style lang="scss">
.log-in-page {
  text-align: center;

  .buttons {
    margin-top: 30px;
    button {
      margin: 20px auto;
    }
  }
  .forgot-password {
    text-decoration: none;
    color: white;
    padding: 0;
    width: min-content;
    white-space: nowrap;
    margin: auto;
  }
}
</style>
