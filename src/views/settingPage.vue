<template>
  <v-container class="mt-4">
    <v-row justify="center">
      <v-col cols="3">
        <v-list>
          <v-list-subheader>設定</v-list-subheader>
          <v-list-item
            v-for="(item, index) in settingsOptions"
            :value="item"
            :key="index"
            @click="currentOption = item">
            <template v-slot:prepend>
              <font-awesome-icon
                :icon="item.icon"
                size="lg"
                class="me-3" />
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col :cols="$vuetify.display.mdAndUp ? 6 : 9">
        <v-card
          class="mt-4 pa-4"
          elevation="3">
          <v-card-title class="text-h5 font-weight-bold"
            ><font-awesome-icon
              :icon="currentOption.icon"
              size="lg"
              class="me-3" />{{ currentOption.title }}</v-card-title
          >
          <v-card-subtitle>{{ currentOption.description }}</v-card-subtitle>
          <v-expand-transition mode="out-in">
            <keep-alive>
              <component
                :is="currentOption.component"
                class="mt-2" />
            </keep-alive>
          </v-expand-transition>
          <v-card-actions class="me-1">
            <v-spacer />
            <v-btn
              color="secondary"
              size="large"
              >取消</v-btn
            >
            <v-btn
              variant="elevated"
              color="primary"
              size="large"
              >儲存</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import wevUserProfileSetting from "@/components/settings/webUserProfileSetting.vue";
  import webAccountSetting from "@/components/settings/webAccountSettings.vue";
  import WebNotificationSettings from "@/components/settings/webNotificationSettings.vue";
  const settingsOptions = ref([
    {
      title: "個人資料",
      component: wevUserProfileSetting,
      icon: "id-badge",
      description: "展示你的人特質，讓旅伴盡情見識幽默獨特的個人風格！",
    },
    {
      title: "帳號設定",
      component: webAccountSetting,
      icon: "user",
      description: "管理你的帳號安全與隱私，包括密碼更新及連結社交平台。",
    },
    {
      title: "通知設定",
      component: WebNotificationSettings,
      icon: "bell",
      description: "輕鬆管理通知，讓每則提醒化身旅程中滿滿驚喜與趣味！",
    },
  ]);

  // onMounted(async () => {
  //   try{    const userProfileResponse = await axios.get("/api/userProfile/getUserProfile");}

  // });

  const currentOption = ref(settingsOptions.value[0]);
</script>
