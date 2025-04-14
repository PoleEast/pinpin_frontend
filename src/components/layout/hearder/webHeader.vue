<template>
  <v-app-bar app color="primary" elevation="2">
    <router-link :to="{ name: 'home' }" class="d-flex align-center ps-3 text-decoration-none">
      <v-img :width="$vuetify.display.mdAndUp ? 150 : 100" src="/src/assets/logo.png" alt="PinPin Logo" />
    </router-link>

    <!-- Desktop Navigation -->
    <div v-if="$vuetify.display.mdAndUp" class="d-flex align-center w-100 ml-4">
      <div class="d-flex">
        <v-btn v-for="item in menuItems" :key="item.title" :to="item.path" color="white" variant="text" class="text-h6 font-weight-bold ml-2">
          {{ item.title }}
        </v-btn>
      </div>
      <div class="ml-auto mr-3">
        <v-fade-transition hide-on-leave>
          <WebUserBtn v-show="isLoggedIn" @show-snackbar="pushSnackbar" />
        </v-fade-transition>
        <v-fade-transition hide-on-leave>
          <v-btn v-show="!isLoggedIn" class="text-h6 font-weight-bold w-100" color="white" variant="text" @click="showDialogLogin"
            ><template v-slot:append>
              <font-awesome-icon icon="right-to-bracket" />
            </template>
            登入/註冊
          </v-btn>
        </v-fade-transition>
      </div>
    </div>

    <v-spacer />

    <!-- Mobile Navigation -->
    <template v-if="$vuetify.display.smAndDown">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon color="white" v-bind="props">
            <font-awesome-icon icon="bars" size="2x" />
          </v-btn>
        </template>

        <v-list density="compact">
          <v-list-item v-for="item in menuItems" :key="item.title" :to="item.path">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
          <v-divider class="my-2" />
          <v-fade-transition hide-on-leave>
            <WebUserBtn v-show="isLoggedIn" @show-snackbar="pushSnackbar" />
          </v-fade-transition>
          <v-fade-transition hide-on-leave>
            <v-btn v-show="!isLoggedIn" class="text-body-1 font-weight-bold" variant="text" @click="showDialogLogin"
              ><template v-slot:append>
                <font-awesome-icon icon="right-to-bracket" />
              </template>
              登入/註冊
            </v-btn>
          </v-fade-transition>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
  <WebLogin ref="webLoginRef" v-model:show-dialog="showDialog" @show-snackbar="pushSnackbar" />
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";
  import WebLogin from "@/components/layout/hearder/dialog/dialogLoginRegister.vue";
  import WebUserBtn from "@/components/layout/hearder/webUserBtn.vue";
  import { useAuthStore } from "@/stores/auth.store";
  import { useSnackbarStore } from "@/stores/snackbar.store";
  import type { Isnackbar } from "@/interfaces/snackbar.interface";

  const authStore = useAuthStore();
  const snackbarStore = useSnackbarStore();

  const menuItems = [
    { title: "行程規劃", path: "/schdule" },
    { title: "搜尋景點", path: "/search" },
  ];

  //登入modal相關
  const showDialog = ref(false);
  const webLoginRef = ref();

  const showDialogLogin = () => {
    showDialog.value = true;
    webLoginRef.value.handleLoginStatus();
  };

  const pushSnackbar = (snackbar: Isnackbar) => {
    snackbarStore.PushSnackbar(snackbar);
  };

  //登入狀態
  const isLoggedIn = computed((): boolean => {
    return authStore.UserNickname !== "";
  });
</script>

<style scoped>
  .v-btn {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }
</style>
