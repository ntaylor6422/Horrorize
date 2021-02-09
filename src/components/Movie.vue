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
        <v-rating
          hover
          dark
          clearable
          v-model="ratingNumber"
          @click.native="ratingHandler"
        ></v-rating>
        <div>
          <v-textarea outlined v-model="commentText"></v-textarea>
          <v-btn @click="makeComment">Comment</v-btn>
        </div>
        <!-- <ReviewCard /> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import ReviewCard from "./ReviewCard";
const axios = require("axios");
export default {
  components: {},
  data: () => ({
    commentText: "",
    ratingNumber: null,
  }),
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
  methods: {
    makeComment: function() {},
    ratingHandler: async function() {
      const rating = await axios.post(
        `/movie/${this.$store.state.movie.title}/rating`,
        {
          movietitle: this.$store.state.movie.title,
          rating: this.ratingNumber,
          displayname: "ntaylor2276",
        }
      );
      console.log(rating);
    },
  },
};
</script>

<style></style>
