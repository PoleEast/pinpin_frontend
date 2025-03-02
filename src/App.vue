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
  import axios, { type AxiosResponse } from "axios";
  import { useAuthStore } from "./stores/auth.store";
  import type { ApiResponseDTO, LoginResponseDTO } from "pinpin_library";
  import { onMounted } from "vue";
  import WebSnackbar from "./components/common/webSnackbar.vue";

  //TODO: 將snackbar移至Pinia在這做控制

  onMounted(async () => {
    await checkToken();
  });

  const checkToken = async () => {
    try {
      const response: AxiosResponse<ApiResponseDTO<LoginResponseDTO>> = await axios("/user/check-auth");
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
