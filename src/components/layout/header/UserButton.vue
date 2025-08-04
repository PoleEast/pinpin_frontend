<template>
  <v-btn class="bg-secondary text-none">
    您好，{{ nickname }}
    <v-menu activator="parent" :location="$vuetify.display.mdAndUp ? 'bottom' : 'start'">
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" :to="item.path" :value="index">
          <v-list-item-title class="font-weight-bold">
            {{ item.title }}
          </v-list-item-title>
          <template v-slot:prepend>
            <font-awesome-icon class="text-primary pe-2" :icon="item.icon" />
          </template>
        </v-list-item>
        <v-list-item class="px-1" key="logout" value="logout">
          <v-divider class="mb-2" />
          <v-list-item-title class="text-right rounded">
            <v-btn class="text-body-1 font-weight-bold" variant="text" @click="logout">
              <template v-slot:append>
                <font-awesome-icon class="text-primary" icon="right-to-bracket" />
              </template>
              登出
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <template v-slot:append>
      <v-avatar :image="imageUrl" size="37"></v-avatar>
    </template>
  </v-btn>
</template>

<script setup lang="ts">
  import type { Isnackbar } from "@/interfaces";
  import { useAuthStore } from "@/stores";
  import { cloudinaryUrl } from "@/utils";
  import { computed } from "vue";

  const emit = defineEmits<{
    showSnackbar: [snackbar: Isnackbar];
    test: [];
  }>();

  const items = [
    { title: "會員資料", icon: "pen-ruler", path: "/userProfiles" },
    { title: "分帳功能", icon: "coins", path: "" },
  ];

  const nickname = computed(() => {
    return useAuthStore().UserNickname;
  });

  const imageUrl = computed(() => {
    const avatarPublicId = `${useAuthStore().AvatarPublicId}`;
    const transformString = "h_100,w_100";

    return cloudinaryUrl(avatarPublicId, transformString);
  });

  const logout = async () => {
    const logoutResult = await useAuthStore().Logout();
    const snackbar: Isnackbar = {
      timeout: 2000,
      message: logoutResult.message,
      color: logoutResult.statusCode == 200 ? "success" : "error",
    };
    emit("showSnackbar", snackbar);
  };
</script>
