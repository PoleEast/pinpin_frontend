<template>
  <v-app>
    <webHeader />
    <v-main>
      <router-view></router-view>
    </v-main>
    <webFooter />
  </v-app>
</template>

<script setup lang="ts">
import webHeader from './components/layout/webHeader.vue'
import webFooter from './components/layout/webFooter.vue'
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
