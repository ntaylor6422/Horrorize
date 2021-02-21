<template>
  <v-container fluid>
    <v-row justify="center" align="center" class="mt-3 pa-5">
      <h1>{{ user.displayname }}</h1>
      <v-spacer></v-spacer>
      <h3>{{ user.email }}</h3>
    </v-row>
    <v-row>
      <v-col>
        <v-expansion-panels accordion>
          <v-expansion-panel>
            <v-card v-for="comment in user.comments" :key="comment.id" dark>
              <v-card-title>{{ comment.movietitle }}</v-card-title>
              <v-card-subtitle>{{ comment.datecommented }}</v-card-subtitle>
              <v-card-text>{{ comment.comment }}</v-card-text>
            </v-card>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col>
        <v-expansion-panels accordion>
          <v-expansion-panel>
            <v-card v-for="rating in user.ratings" :key="rating.id" dark>
              <v-card-title>{{ rating.movietitle }}</v-card-title>
              <v-card-text>{{ rating.rating }}</v-card-text>
            </v-card>
          </v-expansion-panel>
        </v-expansion-panels>
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
