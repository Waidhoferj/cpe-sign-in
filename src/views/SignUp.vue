<template>
  <div class="page sign-up-page">
    <div class="content">
      <img src="@/assets/cpe-logo.svg" class="logo" />
      <h1 class="title">Sign Up</h1>
      <form @submit.prevent="signIn">
        <text-field
          v-model.trim="firstName"
          @blur="$v.firstName.$touch()"
          label="First Name"
          :invalid="$v.firstName.$error"
          errorMessage="required"
        ></text-field>
        <text-field
          v-model.trim="lastName"
          @blur="$v.lastName.$touch()"
          label="Last Name"
          :invalid="$v.lastName.$error"
          errorMessage="required"
        ></text-field>
        <text-field
          v-model.trim="$v.major.$model"
          label="Major"
          :invalid="$v.major.$error"
          errorMessage="required"
        ></text-field>
        <text-field
          v-model.trim="email"
          @blur="$v.email.$touch()"
          label="Email"
          :invalid="$v.email.$error"
          errorMessage="enter a valid email"
        ></text-field>
        <text-field
          v-model.trim="password"
          @blur="$v.password.$touch()"
          label="Password"
          :invalid="$v.password.$error"
          errorMessage="must have at least 7 characters"
          type="password"
        ></text-field>

        <input type="submit" value style="display: none" />
      </form>
      <div class="buttons">
        <button class="primary" ref="signUpButton" @click="signUp">Sign Up</button>
        <button class="secondary" @click="$router.push('login')">Back</button>
      </div>
    </div>
    <loader v-if="loading"></loader>
  </div>
</template>

<script>
import TextField from "@/components/TextField";
import Loader from "@/components/Loader";
import { auth, db } from "@/modules/firebase";
import firebase from "firebase/app";
import { required, minLength, email } from "vuelidate/lib/validators";
import { animateEl } from "@/modules/animate";
export default {
  components: {
    TextField,
    Loader
  },
  props: {
    eventId: String
  },
  data() {
    return {
      loading: false,
      firstName: "",
      lastName: "",
      major: "",
      email: "",
      password: ""
    };
  },
  methods: {
    async signUp() {
      this.$v.$touch();
      if (this.$v.$error) return animateEl(this.$refs.signUpButton, "shake");

      let gender;
      this.loading = true;
      try {
        //Sign up
        await auth.createUserWithEmailAndPassword(this.email, this.password);
        auth.currentUser.updateProfile({
          displayName: this.firstName
        });
      } catch (err) {
        this.loading = false;
        return alert(err.message);
      }
      //Get gender
      gender = await this.predictGender();
      //Create the account
      try {
        await db
          .collection("users")
          .doc(auth.currentUser.uid)
          .set({
            firstName: this.firstName,
            lastName: this.lastName,
            major: this.major,
            gender,
            eventsAttended: this.eventId ? [this.eventId] : []
          });
      } catch (err) {
        this.loading = false;
        return alert(err.message);
      }
      this.loading = false;
      this.$router.push("brief");
    },
    async predictGender() {
      return fetch(
        `https://gender-api.com/get?name=${this.firstName}&key=lAhskKfsUQLhEHKeJp`
      )
        .then(response => response.json())
        .then(data => data.gender)
        .catch(err => "unknown");
    }
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    major: {
      required
    },
    email: {
      email,
      required
    },
    password: {
      required,
      minLength: minLength(7)
    }
  }
};
</script>

<style lang="scss">
.sign-up-page {
  text-align: center;
  .buttons {
    margin-top: 30px;
    button {
      margin: 20px auto;
    }
  }
}
</style>
