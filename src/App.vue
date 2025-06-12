<template>
  <v-app class="app-bg">
    <AppHeader />
    <v-main>
      <router-view></router-view>
    </v-main>
    <AppFooter />
    <AppSnackbar />
  </v-app>
</template>

<script setup lang="ts">
  import AppHeader from "./components/layout/header/AppHeader.vue";
  import AppFooter from "./components/layout/footer/AppFooter.vue";
  import AppSnackbar from "./components/layout/AppSnackbar.vue";
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
