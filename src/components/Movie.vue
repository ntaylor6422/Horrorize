<template>
  <v-container class="justify-center textColors">
    <v-row class="ml-3 mr-3 mt-5 mb-5 justify-space-between">
      <v-btn @click="handleBack">Back</v-btn>
      <h1 class="center">{{ movie.title }}</h1>
      <h2>{{ movie.release_date }}</h2>
    </v-row>
    <v-row class="justify-center">
      <v-col>
        <div class="imgCon">
          <img
            :src="baseUrl + size[3] + movie.poster_path"
            v-on:load="loadHandler"
          />
        </div>
      </v-col>
      <v-col>
        <section class="mb-6">
          <h1>Overview</h1>
          <p>
            {{ movie.overview }}
          </p>
        </section>
        <v-divider></v-divider>
        <div v-if="user">
          <h1>
            Comment and Rate
          </h1>
          <v-rating
            hover
            dark
            clearable
            v-model="ratingNumber"
            @click.native="ratingHandler"
          ></v-rating>
          <div>
            <v-textarea outlined v-model="commentText" dark></v-textarea>
            <v-btn @click="makeComment" dark>Comment</v-btn>
          </div>
        </div>
        <v-container>
          <v-card
            v-for="comment in dbMovie.data.movie.comments"
            :key="comment.id"
            class="mb-1"
            dark
          >
            <v-card-title>{{ comment.displayname }}</v-card-title>
            <v-card-subtitle>{{
              new Date(comment.datecommented).toLocaleTimeString(undefined, {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hours: "numeric",
                minutes: "numeric",
              })
            }}</v-card-subtitle>
            <v-card-text>{{ comment.comment }}</v-card-text>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const axios = require("axios");
export default {
  components: {},
  data: () => ({
    loading: true,
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
    dbMovie: function() {
      return this.$store.state.dbMovie;
    },
    user: function() {
      return this.$store.state.user;
    },
  },
  methods: {
    makeComment: async function() {
      await axios.post(`/movie/${this.movie.id}/comment`, {
        movieid: this.movie.id,
        movietitle: this.movie.title,
        comment: this.commentText,
        datecommented: new Date(),
        displayname: this.user.displayname,
      });
      this.$store.dispatch("getDbMovie", this.movie.id);
    },
    ratingHandler: async function() {
      const rating = {
        movieid: this.movie.id,
        movietitle: this.movie.title,
        rating: this.ratingNumber,
        displayname: this.user.displayname,
      };
      await axios.post(`/movie/${this.movie.id}/rating`, rating);
    },
    loadHandler: function() {
      this.loading = false;
    },
    handleBack: function() {
      this.$store.dispatch("setView", "list");
    },
  },
};
</script>

<style>
.imgCon {
  display: flex;
  justify-content: center;
}
.textColors {
  color: white;
}
</style>
