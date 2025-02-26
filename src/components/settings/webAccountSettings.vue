<template>
  <v-container fluid>
    <v-form>
      <v-text-field
        v-for="input in inputList"
        :key="input.model"
        :label="input.label"
        :type="input.type"
        :required="input.required"
        outlined
        dense
        clearable></v-text-field>
    </v-form>
  </v-container>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const inputList = ref([
    {
      label: "使用者名稱",
      model: "username",
      required: true,
    },
    {
      label: "電子郵件",
      model: "email",
      type: "email",
      required: true,
    },
    {
      label: "新密碼",
      model: "password",
      type: "password",
    },
    {
      label: "確認新密碼",
      model: "confirmPassword",
      type: "password",
    },
  ]);
</script>
