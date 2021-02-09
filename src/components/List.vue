<template>
  <v-container>
    <v-card
      v-for="movie in movies"
      :key="movie.original_name"
      @click="toggleList(movie)"
    >
      <v-card-title>{{
        movie.original_title ? movie.original_title : movie.original_name
      }}</v-card-title>
      <v-card-subtitle>
        {{ movie.release_date ? movie.release_date : movie.first_air_date }}
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "List",

  data: () => ({}),
  computed: {
    movies: function() {
      return this.$store.state.movies;
    },
    movieConfig: function() {
      return this.$store.state.movieConfig;
    },
    baseUrl: function() {
      return this.$store.state.apiBaseUrl;
    },
    size: function() {
      return this.$store.state.size;
    },
  },
  methods: {
    toggleList(movie) {
      this.$store.dispatch("setListView");
      this.sendMovie(movie);
    },
    sendMovie(movie) {
      this.$store.dispatch("getMovieById", movie.id);
    },
  },
};
</script>
