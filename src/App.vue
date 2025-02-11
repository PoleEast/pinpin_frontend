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
import webHeader from './components/layout/hearder/webHeader.vue'
import webFooter from './components/layout/webFooter.vue'
import axios, { type AxiosResponse } from 'axios'
import { useAuthStore } from './stores/auth.store'
import type { ApiResponseDTO, AuthResponseDTO } from 'pinpin_library'
import { onMounted } from 'vue'

onMounted(async () => {
  await checkToken()
})

const checkToken = async () => {
  try {
    const response: AxiosResponse<ApiResponseDTO<AuthResponseDTO>> = await axios('/auth/check-auth')
    useAuthStore().setUser(response.data?.data?.nickname || '')
  } catch {
    useAuthStore().setUser('')
  }
}
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
