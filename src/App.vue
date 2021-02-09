<template>
  <v-app app>
    <v-app-bar app dark clipped-left>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="d-flex align-center">
        Horrorize
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <input type="text" placeholder="Search Movies" class="inputClass" />
    </v-app-bar>
    <v-navigation-drawer app clipped dark v-model="drawer">
      <v-list nav>
        <v-list-item link>Log in</v-list-item>
        <v-list-item link>Register</v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main app>
      <input type="text" ref="searchInput" />
      <List v-if="list" />
      <Movie v-else />
    </v-main>
  </v-app>
</template>

<script>
import List from "./components/List";
import Movie from "./components/Movie";

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
  }),
  methods: {
    getMovies: function() {
      this.$store.dispatch("getHorrors");
    },
    searchMovie: function() {
      console.log(this.$refs.searchInput.value);
      this.$store.dispatch("getMovie", this.$refs.searchInput.value);
    },
    movieConfig: function() {
      this.$store.dispatch("getApiConfig");
    },
    toggleDrawer: function() {
      this.drawer = !this.drawer;
    },
  },
};
</script>

<style scoped>
.inputClass {
  border: 1px solid rgb(126, 66, 66);
  border-radius: 3px;
}
</style>
