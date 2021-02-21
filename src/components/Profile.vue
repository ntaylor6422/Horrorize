<template>
  <v-container fluid>
    <v-row justify="center" align="center" class="mt-3 pa-5">
      <h1>{{ user.displayname }}</h1>
      <v-spacer></v-spacer>
      <h3>{{ user.email }}</h3>
    </v-row>
    <v-row>
      <v-tabs
        v-model="tab"
        background-color="accent-4"
        class="elevation-2"
        dark
        :centered="false"
        :grow="false"
        :vertical="false"
        :right="false"
        :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
        :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
        :icons-and-text="icons"
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab v-for="i in tabs" :key="i">
          {{ i }}
          <v-icon v-if="icons">mdi-phone</v-icon>
        </v-tab>

        <v-tab-item v-for="comment in user.comments" :key="comment.id">
          <v-card dark>
            <v-card-title>{{ comment.movietitle }}</v-card-title>
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
        </v-tab-item>
      </v-tabs>
      <!-- <v-expansion-panels accordion>
          <v-expansion-panel>
            <v-card v-for="comment in user.comments" :key="comment.id" dark>
              <v-card-title>{{ comment.movietitle }}</v-card-title>
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
          </v-expansion-panel>
        </v-expansion-panels> -->
      <!-- <v-expansion-panels accordion>
          <v-expansion-panel>
            <v-card v-for="rating in user.ratings" :key="rating.id" dark>
              <v-card-title>{{ rating.movietitle }}</v-card-title>
              <v-card-text>{{ rating.rating }}</v-card-text>
            </v-card>
          </v-expansion-panel>
        </v-expansion-panels> -->
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    tab: null,
    tabs: ["Comments", "Ratings"],
    prevIcon: false,
    nextIcon: false,
  }),
  computed: {
    user: function() {
      return this.$store.state.user;
    },
  },
};
</script>

<style></style>
