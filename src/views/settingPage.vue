<template>
  <!-- TODO:改成用router驅動設定組件的切換，詳細看命名視圖docs -->
  <v-container fluid class="mt-4">
    <v-row justify="center" no-gutters>
      <v-spacer />
      <v-col cols="0" md="2">
        <v-list class="mt-4 d-none d-md-block bg-transparent">
          <v-list-subheader>設定</v-list-subheader>
          <v-list-item
            v-for="(item, index) in settingsOptions"
            :value="item"
            :key="index"
            :active="currentOption === item"
            @click="currentOption = item">
            <template v-slot:prepend>
              <font-awesome-icon :icon="item.icon" size="lg" class="me-3" />
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12" md="5">
        <v-card class="mt-4 pa-4" elevation="3">
          <v-card-title class="text-h5 font-weight-bold">
            <font-awesome-icon
              v-if="currentOption"
              :icon="currentOption?.icon"
              size="lg"
              class="me-3" />
            {{ currentOption?.title }}
          </v-card-title>
          <v-card-subtitle>{{ currentOption?.description }}</v-card-subtitle>
          <v-skeleton-loader
            v-if="initLoading"
            type="card-avatar,heading,list-item-two-line, actions"
            class="mx-auto"></v-skeleton-loader>
          <v-expand-transition v-else mode="out-in">
            <keep-alive>
              <component
                :is="currentOption?.component"
                v-bind="currentOption?.props"
                v-on="currentOption?.emits || {}"
                class="mt-2" />
            </keep-alive>
          </v-expand-transition>
        </v-card>
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
  <v-fab app class="d-md-none" color="primary" icon size="large">
    <font-awesome-icon icon="ellipsis-vertical" size="lg" />
    <v-speed-dial activator="parent" location="bottom">
      <v-btn
        v-for="(item, index) in settingsOptions"
        :key="index"
        :value="item.title || index"
        :active="currentOption?.title === item.title"
        @click="currentOption = item"
        size="large"
        class="mb-2"
        :class="currentOption?.title === item.title ? 'bg-success' : 'bg-primary'"
        icon>
        <font-awesome-icon :icon="item.icon" size="lg" />
      </v-btn>
    </v-speed-dial>
  </v-fab>
</template>

<script lang="ts" setup>
  //#region import

  import { computed, markRaw, onMounted, ref, type Ref } from "vue";

  //components
  import UserProfileSetting from "@/components/feature/settings/UserProfileSetting.vue";
  import AccountSettings from "@/components/feature/settings/AccountSettings.vue";
  import NotificationSettings from "@/components/feature/settings/NotificationSettings.vue";

  //services
  import { settingService } from "@/services";
  import { useSnackbarStore } from "@/stores";

  //types
  import type {
    AccountRequest,
    SettingResponse,
    UserProfileRequest,
    UserProfileResponse,
  } from "pinpin_library";
  import type {
    AccountSettingFormData,
    SettingOption,
    Snackbar,
    UserProfileSettingFromData,
  } from "@/interfaces";

  //#endregion

  //#region variable
  const settingData = ref<SettingResponse>();
  const userProfile = ref<UserProfileResponse>();
  const updateLoading = ref(true);
  const currentOption: Ref<SettingOption | null> = ref(null);

  const snackbarStore = useSnackbarStore();

  const initLoading = computed(() => {
    return settingData.value === undefined || userProfile.value === undefined;
  });
  const settingsOptions = computed((): SettingOption[] => [
    {
      title: "帳號設定",
      component: markRaw(AccountSettings),
      icon: "user",
      props: { isLoading: updateLoading, userProfile: userProfile },
      emits: { update: updateAccountSetting },
      description: "管理你的帳號安全與隱私，包括密碼更新及連結社交平台。",
    },
    {
      title: "個人資料",
      component: markRaw(UserProfileSetting),
      icon: "id-badge",
      props: {
        isLoading: updateLoading,
        settingData: settingData,
        userProfile: userProfile,
      },
      emits: { update: updateUserProfile },
      description: "展示你的人特質，讓旅伴盡情見識幽默獨特的個人風格！",
    },
    {
      title: "通知設定",
      component: markRaw(NotificationSettings),
      icon: "bell",
      props: { isLoading: updateLoading, settingData: settingData },
      emits: {},
      description: "輕鬆管理通知，讓每則提醒化身旅程中滿滿驚喜與趣味！",
    },
  ]);

  //#endregion

  //#region function
  const getSettingData = async (): Promise<SettingResponse> => {
    try {
      return (await settingService.GetSettingData()).data?.data || ({} as SettingResponse);
    } catch {
      return {} as SettingResponse;
    }
  };

  const getUserProfile = async (): Promise<UserProfileResponse> => {
    try {
      return (await settingService.GetUserProfile()).data?.data || ({} as UserProfileResponse);
    } catch {
      return {} as UserProfileResponse;
    }
  };

  const updateAccountSetting = async (
    accountSettingsFormData: AccountSettingFormData,
  ): Promise<AccountRequest> => {
    updateLoading.value = true;
    try {
      const accountRequestDTO: AccountRequest = {
        email: accountSettingsFormData.email,
        password: accountSettingsFormData.password,
      };

      const response = await settingService.UpdateAccountSetting(accountRequestDTO);
      const snackbar: Snackbar = {
        timeout: 2000,
        message: "帳號設定更新成功",
        color: "success",
      };
      snackbarStore.PushSnackbar(snackbar);

      if (userProfile.value && userProfile.value.user) {
        userProfile.value.user.email = response.data?.data?.email;
      }

      //TODO : 收集全局意料外錯誤處理

      return response.data?.data || ({} as AccountRequest);
    } catch {
      return {} as AccountSettingFormData;
    } finally {
      updateLoading.value = false;
    }
  };

  const updateUserProfile = async (userProfileSettingFromData: UserProfileSettingFromData) => {
    updateLoading.value = true;
    try {
      const userProfileRequestDTO: UserProfileRequest = {
        nickname: userProfileSettingFromData.nickname,
        fullname: userProfileSettingFromData.fullname,
        motto: userProfileSettingFromData.motto,
        bio: userProfileSettingFromData.bio,
        isFullNameVisible: userProfileSettingFromData.isFullNameVisible,
        coverPhoto: userProfileSettingFromData.coverPhoto,
        birthday: userProfileSettingFromData.birthday,
        gender: userProfileSettingFromData.gender,
        phone: userProfileSettingFromData.phone,
        address: userProfileSettingFromData.address,
        originCountry: userProfileSettingFromData.originCountry,
        visitedCountries: userProfileSettingFromData.visitedCountries,
        travelInterests: userProfileSettingFromData.travelInterests,
        travelStyles: userProfileSettingFromData.travelStyles,
        languages: userProfileSettingFromData.languages,
        currencies: userProfileSettingFromData.currencies,
      };

      const response = await settingService.UpdateUserProfileSetting(userProfileRequestDTO);

      const snackbar: Snackbar = {
        timeout: 2000,
        message: "個人資料更新成功",
        color: "success",
      };
      snackbarStore.PushSnackbar(snackbar);

      if (userProfile.value && userProfile.value.user) {
        userProfile.value = response.data?.data;
      }
    } catch {
      return {} as UserProfileResponse;
    } finally {
      updateLoading.value = false;
    }
  };

  //#endregion

  onMounted(async () => {
    try {
      const [settingResponse, profileResponse] = await Promise.all([
        getSettingData(),
        getUserProfile(),
      ]);

      settingData.value = settingResponse;
      userProfile.value = profileResponse;

      currentOption.value = settingsOptions.value[0];
      updateLoading.value = false;
    } catch (error) {
      console.error("加載數據失敗", error);
    }
  });
</script>
