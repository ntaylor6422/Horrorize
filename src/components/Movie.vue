<template>
  <v-container>
    <v-row justify="center">
      <h1>{{ movie.title }}</h1>
      <v-spacer></v-spacer>
      <h2>{{ movie.release_date }}</h2>
    </v-row>
    <v-row>
      <v-col>
        <img :src="baseUrl + size[3] + movie.poster_path" />
      </v-col>
      <v-col>
        <section class="mb-6">
          <h1>Overview</h1>
          <p>
            {{ movie.overview }}
          </p>
        </section>
        <v-divider></v-divider>
        <h1>Comment and Rate</h1>
        <v-rating hover dark></v-rating>
        <div>
          <v-textarea outlined></v-textarea>
          <v-btn>Comment</v-btn>
        </div>
        <ReviewCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ReviewCard from "./ReviewCard";
export default {
  components: {
    ReviewCard,
  },
  computed: {
    movie: function() {
      return this.$store.state.movie;
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
};
</script>

<style></style>
