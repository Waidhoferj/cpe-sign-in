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
        >
        </text-field>
        <input type="submit" value style="display: none" />
      </form>
      <div class="buttons">
        <button class="primary" ref="signInButton" @click="signIn">
          Log In
        </button>
        <button class="secondary" @click="$router.push('/sign-up')">
          Sign Up
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from "@/components/TextField";
import { auth } from "@/modules/firebase";
import { required, minLength, email } from "vuelidate/lib/validators";
import { animateEl } from "@/modules/animate";
export default {
  name: "signIn",
  components: {
    TextField
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async signIn() {
      this.$v.$touch();
      if (this.$v.$error) return animateEl(this.$refs.signInButton, "shake");
      try {
        const user = await auth.signInWithEmailAndPassword(
          this.email,
          this.password
        );
      } catch (e) {
        alert("Incorrect Email or password");
        return;
      }
      this.$router.push("/overview");
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
}
</style>
