require("dotenv").config();
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    view: "profile",
    movie: {},
    movies: [],
    movieConfig: {},
    apiBaseUrl: "",
    apiSize: [],
    dbMovie: {},
    logState: "Login",
    overlay: false,
    user: {
      email: "ldksf@fsdakf.com",
      displayname: "coolguy",
      comments: [],
      ratings: [],
    },
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setMovie(state, movie) {
      state.movie = movie;
    },
    setMultiMovies(state, movies) {
      state.movies = movies;
    },
    setView(state, view) {
      state.list = view;
    },
    setMovieConfig(state, movieConfig) {
      state.movieConfig = movieConfig;
    },
    setBaseUrl(state, base) {
      state.apiBaseUrl = base;
    },
    setSize(state, size) {
      state.apiSize = size;
    },
    setDbMovie(state, movie) {
      state.dbMovie = movie;
    },
    setOverlay(state) {
      state.overlay = !state.overlay;
    },
    setLogState(state, log) {
      state.logState = log;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    getMovie: async ({ commit }, title) => {
      const newTitle = title.split(" ").join("%20");
      const url = `https://api.themoviedb.org/3/search/movie?api_key=fa47395aee6257d86b59cef66174b632&language=en-US&query=${newTitle}&page=1&include_adult=false`;
      const movie = await axios.get(url);
      commit("setMultiMovies", movie.data.results);
    },
    getMovieById: async ({ commit }, id) => {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=fa47395aee6257d86b59cef66174b632&language=en-US`;
      const movie = await axios.get(url);
      commit("setMovie", movie.data);
    },
    getHorrors: async ({ commit }) => {
      const url =
        "https://api.themoviedb.org/3/search/multi?api_key=fa47395aee6257d86b59cef66174b632&language=en-US&query=horror&page=1&include_adult=false";
      const movies = await axios.get(url);
      commit("setMultiMovies", movies.data.results);
    },
    setMovie: ({ commit }, movie) => {
      commit("setMovie", movie);
    },
    setView: ({ commit }, view) => {
      commit("setView", view);
    },
    getApiConfig: async ({ commit }) => {
      const url =
        "https://api.themoviedb.org/3/configuration?api_key=fa47395aee6257d86b59cef66174b632";
      const movieConfig = await axios.get(url);
      commit("setMovieConfig", movieConfig.data);
      commit("setBaseUrl", movieConfig.data.images.base_url);
      commit("setSize", movieConfig.data.images.poster_sizes);
    },
    getMovieDetails: async ({ commit }) => {
      const movie = await axios.get("/api/movie");
      commit("setDbMovie", movie.data);
    },
    getDbMovie: async ({ commit }, movieid) => {
      const movie = await axios.get(`/movie/${movieid}`);
      console.log("from the getter in the store", movie);
      commit("setDbMovie", movie.data);
    },
    setOverlay: ({ commit }) => {
      commit("setOverlay");
    },
    setLogState: ({ commit }, log) => {
      commit("setLogState", log);
    },
  },
});
