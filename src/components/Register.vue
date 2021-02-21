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
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="confirmPass"
              label="Confirm Password"
              type="password"
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
  }),
  methods: {
    handleSignup: async function() {
      if (this.password !== this.confirmPass)
        return alert("Passwords do not match");

      await axios.post("/users/create", {
        email: this.email,
        displayname: this.displayname,
        password: this.password,
      });
      this.handleClose();
    },
    handleClose: function() {
      this.$store.dispatch("setOverlay");
    },
  },
};
</script>

<style></style>
