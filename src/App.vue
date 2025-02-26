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
  import webHeader from "./components/layout/hearder/webHeader.vue";
  import webFooter from "./components/layout/webFooter.vue";
  import axios, { type AxiosResponse } from "axios";
  import { useAuthStore } from "./stores/auth.store";
  import type { ApiResponseDTO, UserResponseDTO } from "pinpin_library";
  import { onMounted } from "vue";

  onMounted(async () => {
    await checkToken();
  });

  const checkToken = async () => {
    try {
      const response: AxiosResponse<ApiResponseDTO<UserResponseDTO>> = await axios("/user/check-auth");
      useAuthStore().SetUser(response.data?.data?.nickname || "");
    } catch {
      useAuthStore().SetUser("");
    }
  };
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
