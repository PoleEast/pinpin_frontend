<!-- 額外寫的目的為不讓snackbar當有複數個時會重複顯示，希望透過使用堆疊的方式解決 -->

<template>
  <v-snackbar timeout="2000" v-model="show" :text="message" :color="color" close> </v-snackbar>
</template>

<script setup lang="ts">
const show = defineModel<boolean>('show')
const { message, color } = defineProps<{ message: string; color: string }>()
</script>
