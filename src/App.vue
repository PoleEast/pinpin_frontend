<template>
  <v-app class="app-bg">
    <webHeader />
    <v-main>
      <router-view></router-view>
    </v-main>
    <webFooter />
    <WebSnackbar />
  </v-app>
</template>

<script setup lang="ts">
  import webHeader from "./components/layout/hearder/webHeader.vue";
  import webFooter from "./components/layout/footer/webFooter.vue";
  import WebSnackbar from "./components/common/webSnackbar.vue";
</script>

<style>
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  .app-bg {
    background-image: url("/src/assets/pattern.svg") !important;
    background-repeat: repeat !important;
  }

  #app {
    height: 100vh;
  }
</style>
