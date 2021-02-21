<template>
  <v-container fluid>
    <v-row justify="center" align="center" class="mt-3 pa-5">
      <h1>
        {{ splitNamed()[0]
        }}<span class="logoStyle">{{ splitNamed()[1] }}</span>
      </h1>
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

        <v-tab-item>
          <v-card
            v-for="comment in user.comments"
            :key="comment.id"
            dark
            class="mb-1 mt-1"
          >
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

        <v-tab-item>
          <v-card
            v-for="rating in user.ratings"
            :key="rating.id"
            dark
            class="mb-3"
          >
            <v-card-title>{{ rating.movietitle }}</v-card-title>
            <v-card-text>{{ rating.rating }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
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
  methods: {
    splitNamed: function() {
      const len = this.user.displayname.length;
      const half = Math.ceil(len / 2);
      const firstHalf = this.user.displayname
        .split("")
        .slice(0, half)
        .join("");
      const secondHalf = this.user.displayname
        .split("")
        .slice(half, len)
        .join("");

      return [firstHalf, secondHalf];
    },
  },
};
</script>

<style>
.logoStyle {
  color: rgb(182, 89, 89);
}
</style>
