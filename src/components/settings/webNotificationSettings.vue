<template>
  <v-form @submit.prevent="saveNotificationSettings">
    <v-switch v-model="notifications.email" label="電子郵件通知"></v-switch>
    <v-switch v-model="notifications.sms" label="簡訊通知"></v-switch>
    <v-switch v-model="notifications.push" label="推播通知"></v-switch>
  </v-form>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const notifications = ref({
    email: true,
    sms: false,
    push: true,
  });

  const saveNotificationSettings = () => {
    alert("通知設定已儲存");
  };
</script>
