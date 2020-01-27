<template>
  <div class="page forgot-password">
    <text-field
      v-model="email"
      @blur="$v.email.$touch()"
      label="Email"
      :invalid="$v.email.$error"
      errorMessage="enter a valid email address"
    ></text-field>
    <button class="primary" @click="sendResetEmail">Reset Password</button>
  </div>
</template>

<script>
import TextField from "@/components/TextField";
import { auth } from "@/modules/firebase";
import { required, email } from "vuelidate/lib/validators";

export default {
  components: {
    TextField
  },
  data() {
    return {
      email: ""
    };
  },
  methods: {
    async sendResetEmail() {
      if (this.$v.$error) return;
      try {
        await auth.sendPasswordResetEmail(this.email);
      } catch (error) {
        return alert(error.message);
      }
      this.$router.push("login");
    }
  },
  validations: {
    email: {
      email,
      required
    }
  }
};
</script>

<style lang="scss">
.forgot-password {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>