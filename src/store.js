import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
const movieKey = process.env.VUE_APP_MOVIE_API;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    view: "list",
    movie: {},
    movies: [],
    movieConfig: {},
    apiBaseUrl: "",
    apiSize: [],
    dbMovie: {},
    logState: "Login",
    overlay: false,
    user: null,
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
      state.view = view;
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
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&language=en-US&query=${newTitle}&page=1&include_adult=false`;
      const movie = await axios.get(url);
      commit("setMultiMovies", movie.data.results);
    },
    getMovieById: async ({ commit }, id) => {
      console.log(id);
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${movieKey}&language=en-US`;
      const movie = await axios.get(url);
      console.log(movie.data);
      commit("setMovie", movie.data);
    },
    getHorrors: async ({ commit }) => {
      console.log(movieKey, process.env.VUE_APP_MOVIE_API);
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&language=en-US&query=horror&page=1&include_adult=false`;
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
      const url = `https://api.themoviedb.org/3/configuration?api_key=${movieKey}`;
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
      commit("setDbMovie", movie.data);
    },
    setOverlay: ({ commit }) => {
      commit("setOverlay");
    },
    setLogState: ({ commit }, log) => {
      commit("setLogState", log);
    },
    refreshUserData: async ({ commit }, person) => {
      const user = await axios.get(`/users/${person.email}`);
      console.log(user.data);
      commit("setUser", user.data.data);
    },
    logout: async ({ commit }) => {
      await axios.get("/users/logout");
      commit("setUser", null);
    },
  },
  getters: {
    getUser: (state) => {
      return state.user;
    },
  },
});
