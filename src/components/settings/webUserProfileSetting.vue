<template>
  <v-form @submit.prevent="saveProfile">
    <v-text-field
      v-model="profile.name"
      label="暱稱"
      required></v-text-field>
    <v-text-field
      v-model="profile.email"
      label="電子郵件"
      type="email"
      required></v-text-field>
    <v-text-field
      v-model="profile.phone"
      label="電話"
      type="tel"></v-text-field>
  </v-form>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const profile = ref({
    name: "",
    email: "",
    phone: "",
    avatar: null,
  });

  const saveProfile = () => {
    alert("個人資料已儲存");
  };
</script>
