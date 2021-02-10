<template>
  <v-app app>
    <v-app-bar app dark clipped-left>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="d-flex align-center logo" @click="logoClick">
        Horror<span class="logo-inner">ize</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <input
        type="text"
        placeholder="Search Movies"
        class="colors"
        v-model="searchInput"
        @change="searchMovie"
      />
    </v-app-bar>
    <v-navigation-drawer app clipped dark v-model="drawer">
      <v-list nav>
        <v-list-item link @click="toggleLog">Log in</v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main app class="grey darken-2">
      <v-dialog dark v-model="signin">
        <v-card class="login">
          <div class="formstyle mb-3">
            <v-card-title>Log in</v-card-title>
            <v-form class="formstyle">
              <label for="emailInput">Email</label>
              <input
                type="email"
                id="emailInput"
                class="inputClass"
                v-model="logEmail"
              />
              <label for="passInput">Password</label>
              <input
                type="password"
                id="passInput"
                class="inputClass"
                v-model="logPass"
              />
              <v-btn @click="handleLogin" light class="signBtn">Log in</v-btn>
            </v-form>
          </div>
          <v-divider></v-divider>
          <div class="formstyle">
            <v-card-title>Register</v-card-title>
            <v-form class="formstyle">
              <label for="emailInputSign">Email</label>
              <input
                type="email"
                id="emailInputSign"
                class="inputClass"
                v-model="signEmail"
              />
              <label for="displayInputSign">Display Name</label>
              <input
                type="text"
                id="displayInputSign"
                class="inputClass"
                v-model="signDisplay"
              />
              <label for="passInputSign">Password</label>
              <input type="password" id="passInputSign" class="inputClass" />
              <label for="passInputTwo">Repeat Password</label>
              <input
                type="password"
                id="passInputTwo"
                class="inputClass"
                v-model="signPass"
              />
              <v-btn @click="handleSignup" light class="signBtn">Sign up</v-btn>
            </v-form>
          </div>
        </v-card>
      </v-dialog>
      <List v-if="list" />
      <Movie v-else />
    </v-main>
  </v-app>
</template>

<script>
import List from "./components/List";
import Movie from "./components/Movie";
const axios = require("axios");

export default {
  name: "App",

  components: {
    List,
    Movie,
  },
  computed: {
    movies: function() {
      return this.$store.state.movies;
    },
    list: function() {
      return this.$store.state.list;
    },
  },
  mounted() {
    this.getMovies();
    this.movieConfig();
  },
  data: () => ({
    drawer: false,
    searchInput: "",
    signin: null,
    logEmail: "",
    logPass: "",
    signEmail: "",
    signPass: "",
    signDisplay: "",
  }),
  methods: {
    getMovies: function() {
      this.$store.dispatch("getHorrors");
    },
    searchMovie: function() {
      this.$store.state.list = true;
      this.$store.dispatch("getMovie", this.searchInput);
    },
    movieConfig: function() {
      this.$store.dispatch("getApiConfig");
    },
    toggleDrawer: function() {
      this.drawer = !this.drawer;
    },
    toggleLog: function() {
      this.signin = !this.signin;
    },
    handleLogin: async function() {
      await axios.post("/users/login", {
        email: this.logEmail,
        password: this.logPass,
      });
    },
    handleSignup: async function() {
      await axios.post("/users/create", {
        email: this.signEmail,
        displayname: this.signDisplay,
        password: this.signPass,
      });
    },
    logoClick: function() {
      this.$store.state.list = true;
    },
  },
};
</script>

<style scoped>
.inputClass {
  border: 1px solid rgb(126, 66, 66);
  border-radius: 3px;
  color: black;
  background: white;
  max-width: 500px;
  min-width: 250px;
}

label,
input {
  color: white;
  max-width: 500px;
  margin: 7px;
}
.formstyle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.signBtn {
  margin: 7px;
}

.colors {
  border: 1px solid #7e4242;
  border-radius: 3px;
  background: #6662621e;
  min-width: 100px;
  color: white;
}
.colors::placeholder {
  color: rgba(255, 255, 255, 0.404);
  text-align: center;
}
.logo {
  font-size: 1.5rem;
  letter-spacing: 2px;
  cursor: pointer;
}
.logo-inner {
  font-weight: bold;
  color: rgb(182, 89, 89);
}
</style>
