<template>
  <v-app app>
    <v-app-bar app dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title class="d-flex align-center">
        Horrorize
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <input type="text" placeholder="Search Movies" class="inputClass" />
    </v-app-bar>
    <v-main app>
      <input type="text" ref="searchInput" />
      <!-- <div>{{ movies }}</div> -->
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
    // movie: function() {
    //   return this.$store.state.movie;
    // },
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
    //
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
  },
};
</script>

<style scoped>
.inputClass {
  border: 1px solid rgb(126, 66, 66);
  border-radius: 3px;
}
</style>
