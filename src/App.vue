<template>
  <v-app>
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
  import { useAuthStore } from "./stores/auth.store";
  import { onMounted } from "vue";
  import WebSnackbar from "./components/common/webSnackbar.vue";

  onMounted(async () => {
    await useAuthStore().CheckAuthStatus();
  });
</script>

<style>
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  #app {
    height: 100vh;
  }
</style>
