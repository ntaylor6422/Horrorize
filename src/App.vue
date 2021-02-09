<template>
  <v-app>
    <v-app-bar app color="primary" dark> </v-app-bar>

    <v-main>
      <List />
    </v-main>
  </v-app>
</template>

<script>
import List from "./components/List";

export default {
  name: "App",

  components: {
    List,
  },

  data: () => ({
    //
  }),
};
</script>
