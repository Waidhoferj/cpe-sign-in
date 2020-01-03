<template>
  <div class="page sign-up-page">
    <div class="content">
      <img src="@/assets/cpe-logo.svg" class="logo" />
      <h1 class="title">Sign Up</h1>
      <form @submit.prevent="signIn">
        <text-field
          v-model="name"
          @blur="$v.name.$touch()"
          label="Name"
          :invalid="$v.name.$error"
          errorMessage="required"
        ></text-field>
        <text-field
          v-model="email"
          @blur="$v.email.$touch()"
          label="Email"
          :invalid="$v.email.$error"
          errorMessage="enter a valid email"
        ></text-field>
        <text-field
          v-model="password"
          @blur="$v.password.$touch()"
          label="Password"
          :invalid="$v.password.$error"
          errorMessage="must have at least 7 characters"
        ></text-field>
        <text-field
          v-model="$v.confirmPassword.$model"
          label="Confirm Password"
          :invalid="$v.confirmPassword.$error"
          errorMessage="does not match password"
        ></text-field>
        <input type="submit" value style="display: none" />
      </form>
      <div class="buttons">
        <button class="primary" ref="signUpButton" @click="signUp">
          Sign Up
        </button>
        <button class="secondary" @click="$router.push('/')">Log In</button>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "@/modules/firebase";
import TextField from "@/components/TextField";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import { animateEl } from "@/modules/animate";
export default {
  components: {
    TextField
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    signUp() {
      this.$v.$touch();
      if (this.$v.$error) return animateEl(this.$refs.signUpButton, "shake");
      return;
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch(err =>
          console.log("could not create a user at this time: ", err)
        );
    }
  },
  validations: {
    name: {
      required
    },
    email: {
      email,
      required
    },
    password: {
      required,
      minLength: minLength(7)
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs("password")
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
