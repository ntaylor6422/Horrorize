<template>
  <v-container fluid grid-list-md class="grey darken-2">
    <!-- xs = 600px full screen (12) -->
    <!-- md = 600px or more. half of the screen (6) -->
    <v-layout row wrap>
      <v-flex
        xs12
        md6
        v-for="movie in movies"
        :key="movie.original_name"
        @click="toggleList(movie)"
        class="justify-space-between"
      >
        <v-card class="cardCon" hover dark>
          <img
            :src="baseUrl + size[0] + movie.poster_path"
            :alt="movie.title"
          />
          <div class="cardInfo">
            <v-card-title>{{
              movie.original_title ? movie.original_title : movie.original_name
            }}</v-card-title>
            <v-card-subtitle>
              {{
                movie.release_date ? movie.release_date : movie.first_air_date
              }}
            </v-card-subtitle>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const axios = require("axios");
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
      return this.$store.state.apiSize;
    },
  },
  methods: {
    toggleList(movie) {
      this.$store.dispatch("setView", "movie");
      this.sendMovie(movie);
      axios
        .post("/movie", {
          movieid: movie.id,
          movietitle: movie.title,
          comments: [],
          ratings: [],
        })
        .then(() => {
          this.sendMovie(movie);
        })
        .catch((err) => {
          this.sendMovie(movie);
          console.log(err);
        });
    },
    sendMovie(movie) {
      this.$store.dispatch("getDbMovie", movie.id);
      this.$store.dispatch("getMovieById", movie.id);
    },
  },
};
</script>

<style scoped>
.cardCon {
  display: flex;
  justify-content: space-evenly;
  min-height: 150px;
}
.cardInfo {
  width: 300px;
}
</style>
