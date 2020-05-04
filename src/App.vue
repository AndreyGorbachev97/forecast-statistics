<template>
  <v-app>
    <app-bar />
    <v-content class="content">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import AppBar from "./components/Header.vue";

export default {
  name: "App",
  components: {
    AppBar
  },
  data: () => ({
    //
  })
};
</script>

<style scoped>
.content {
  margin: 3% 4% 0;
}
</style>
