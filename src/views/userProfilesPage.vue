<template>
  <v-container class="py-8">
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="4" rounded="2xl">
          <v-card-title class="text-xl font-bold py-4"
            >編輯使用者資料</v-card-title
          >
          <v-divider></v-divider>
          <v-card-text>
            <v-form @submit.prevent="onSubmit">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="formData.name"
                    label="姓名"
                    outlined
                    rounded
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="formData.email"
                    label="Email"
                    type="email"
                    outlined
                    rounded
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="formData.phone"
                    label="電話"
                    type="tel"
                    outlined
                    rounded
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="formData.address"
                    label="地址"
                    outlined
                    rounded
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="formData.avatar"
                    label="頭像 URL"
                    type="url"
                    outlined
                    rounded
                    hint="請輸入頭像圖片的連結"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" class="flex flex-col items-center">
                  <v-avatar size="100">
                    <template v-if="formData.avatar">
                      <v-img :src="formData.avatar" alt="avatar" />
                    </template>
                    <template v-else>
                      <v-img
                        src="https://via.placeholder.com/100"
                        alt="default"
                      />
                    </template>
                  </v-avatar>
                </v-col>
              </v-row>

              <v-row class="mt-6" align="center" justify="space-between">
                <v-col cols="6" class="text-left">
                  <v-btn
                    variant="tonal"
                    color="primary"
                    @click="onSubmit"
                    rounded
                  >
                    儲存
                  </v-btn>
                  <v-btn
                    variant="text"
                    color="secondary"
                    @click="onCancel"
                    rounded
                  >
                    取消
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
}

const formData = ref<FormData>({
  name: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
});

function onSubmit() {
  // 寫在這邊做表單資料送出
  console.log("Submitted:", formData.value);
}

function onCancel() {
  // 寫在這邊做取消行為
  console.log("Cancel");
}
</script>

<style scoped>
/* 這邊可以放一些客製化的樣式 */
</style>
