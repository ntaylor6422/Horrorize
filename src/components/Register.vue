<template>
  <v-card light>
    <v-form>
      <v-container>
        <v-row justify="center">
          <v-card-title>Register Now</v-card-title>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="email"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="displayname"
              :counter="10"
              label="Display Name"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              :rules="passwordRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="confirmPass"
              label="Confirm Password"
              type="password"
              :rules="confirmPasswordRules"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="end" class="mb-3">
          <v-btn @click="handleSignup" dark class="signBtn mr-3">Sign up</v-btn>
          <v-btn @click="handleClose" class="mr-3" dark>Close</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    email: "",
    password: "",
    confirmPass: "",
    displayname: "",
    passwordRules: [
      (value) => !!value || "Please type password.",
      (value) => (value && value.length >= 8) || "minimum 6 characters",
      (value) =>
        value &&
        value.match(
          /"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"/g
        ),
    ],
    confirmPasswordRules: [
      (value) => !!value || "type confirm password",
      (value) =>
        value === this.password || "The password confirmation does not match.",
    ],
  }),
  methods: {
    handleSignup: async function() {
      if (this.password !== this.confirmPass)
        return alert("Passwords do not match");

      const newUser = await axios.post("/users/create", {
        email: this.email,
        displayname: this.displayname,
        password: this.password,
      });
      this.$store.commit("setUser", newUser.data.data);
      this.handleClose();
    },
    handlePasswords: function() {},
    handleClose: function() {
      this.$store.dispatch("setOverlay");
    },
  },
};
</script>

<style></style>
