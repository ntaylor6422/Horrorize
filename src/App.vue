<template>
  <v-app app>
    <v-app-bar app dark clipped-left>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="d-flex align-center logo" @click="logoClick"
        >Horror<span class="logo-inner">ize</span>
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
      <v-list v-if="!user.displayname" nav>
        <v-list-item link @click="toggleLog">Login</v-list-item>
        <v-list-item link @click="toggleReg">Register</v-list-item>
      </v-list>
      <v-list v-else nav>
        <v-list-item>Welcome, {{ user.displayname }}</v-list-item>
        <v-list-item link @click="handleProfile">Profile</v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-overlay v-model="overlay">
      <Register v-if="logState === 'Register'" />
      <Login v-else-if="logState === 'Login'" />
    </v-overlay>
    <v-main app class="grey darken-2">
      <List v-if="view === 'list'" />
      <Movie v-else-if="view === 'movie'" />
      <Profile v-else />
    </v-main>
  </v-app>
</template>

<script>
import List from "./components/List";
import Movie from "./components/Movie";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";

export default {
  name: "App",

  components: {
    List,
    Movie,
    Register,
    Login,
    Profile,
  },
  computed: {
    movies: function() {
      return this.$store.state.movies;
    },
    view: function() {
      return this.$store.state.view;
    },
    logState: function() {
      return this.$store.state.logState;
    },
    overlay: function() {
      return this.$store.state.overlay;
    },
    user: function() {
      return this.$store.state.user;
    },
  },
  mounted() {
    this.getMovies();
    this.movieConfig();
  },
  data: () => ({
    drawer: false,
    searchInput: "",
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
      this.$store.dispatch("setOverlay");
      this.$store.dispatch("setLogState", "Login");
    },
    toggleReg: function() {
      this.$store.dispatch("setOverlay");
      this.$store.dispatch("setLogState", "Register");
    },
    logoClick: function() {
      this.$store.state.list = true;
    },
    handleProfile: function() {
      this.$store.dispatch("setView", "profile");
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

@media screen and (max-width: 400px) {
  .logo {
    font-size: 1.2rem;
  }
}
</style>
