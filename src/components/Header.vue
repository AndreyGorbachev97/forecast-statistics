<template>
  <div>
    <v-app-bar color="primary" dark>
      <v-toolbar-title>
        <div>
          <router-link class="title" to="/home">Home</router-link>
        </div>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn to="movingaverage" text class="ma-2 white--text">
        Moving Average
        <v-icon right>mdi-table-edit</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>
