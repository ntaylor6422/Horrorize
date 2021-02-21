<template>
  <v-container fluid>
    <v-row justify="center" align="center" class="mt-3 pa-5">
      <h1>{{ user.displayname }}</h1>
      <v-spacer></v-spacer>
      <h3>{{ user.email }}</h3>
    </v-row>
    <v-row>
      <v-col>
        <v-card v-for="comment in user.comments" :key="comment.id">
          <v-card-title>{{ comment.comment }}</v-card-title>
        </v-card>
      </v-col>
      <v-col>
        <v-card v-for="rating in user.ratings" :key="rating.id">
          <v-card-title>{{ rating.rating }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    user: function() {
      return this.$store.state.user;
    },
  },
};
</script>

<style></style>
