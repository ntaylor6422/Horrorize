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
          <v-textarea
            outlined
            v-model="commentText"
            class="textCon"
          ></v-textarea>
          <v-btn @click="makeComment">Comment</v-btn>
        </div>
        <v-container>
          <v-card
            v-for="comment in dbMovie.data.movie.comments"
            :key="comment.id"
            class="mb-1"
            dark
          >
            <v-card-title>{{
              new Date(comment.datecommented).toLocaleTimeString(undefined, {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hours: "numeric",
                minutes: "numeric",
              })
            }}</v-card-title>
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
  },
  methods: {
    makeComment: async function() {
      await axios.post(`/movie/${this.movie.id}/comment`, {
        movieid: this.movie.id,
        movietitle: this.movie.title,
        comment: this.commentText,
        datecommented: new Date(),
      });
      this.$store.dispatch("getDbMovie", this.movie.id);
    },
    ratingHandler: async function() {
      await axios.post(`/movie/${this.movie.id}/rating`, {
        movietitle: this.$store.state.movie.title,
        rating: this.ratingNumber,
        displayname: "ntaylor2276",
      });
    },
    loadHandler: function() {
      this.loading = false;
    },
    handleBack: function() {
      this.$store.dispatch("setListView");
    },
  },
};
</script>

<style>
.imgCon {
  display: flex;
  justify-content: center;
}
.textCon {
  background-color: #8886865b;
}
.textColors {
  color: white;
}
</style>
