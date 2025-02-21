<template>
  <v-container>
    <v-form @submit.prevent="saveAccountSettings">
      <v-text-field
        v-model="account.username"
        label="使用者名稱"
        required
      ></v-text-field>
      <v-text-field
        v-model="account.email"
        label="電子郵件"
        type="email"
        required
      ></v-text-field>
      <v-text-field
        v-model="account.password"
        label="新密碼"
        type="password"
      ></v-text-field>
      <v-text-field
        v-model="account.confirmPassword"
        label="確認新密碼"
        type="password"
      ></v-text-field>
    </v-form>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const account = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const saveAccountSettings = () => {
  alert("帳號設定已儲存");
};
</script>
