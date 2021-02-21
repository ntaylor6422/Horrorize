<template>
  <v-card min-width="350px" light>
    <v-form>
      <v-container>
        <v-row justify="center">
          <v-card-title>Login</v-card-title>
        </v-row>
        <v-row justify="center">
          <v-col cols="12">
            <v-text-field
              v-model="email"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-text-field
              v-model="password"
              type="password"
              label="Password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="end" class="mb-3">
          <v-btn @click="handleLogin" dark class="signBtn mr-3">Login</v-btn>
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
  }),
  methods: {
    handleClose: function() {
      this.$store.dispatch("setOverlay");
    },
    handleLogin: async function() {
      const user = await axios.post("/users/login", {
        email: this.email,
        password: this.password,
      });
      this.$store.commit("setUser", user.data.data.user);
      this.handleClose();
    },
  },
};
</script>

<style></style>
