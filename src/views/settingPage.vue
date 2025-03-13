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
            :active="currentOption === item"
            @click="currentOption = item">
            <template v-slot:prepend>
              <font-awesome-icon :icon="item.icon" size="lg" class="me-3" />
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col :cols="$vuetify.display.mdAndUp ? 6 : 9">
        <v-card class="mt-4 pa-4" elevation="5">
          <v-card-title class="text-h5 font-weight-bold"
            ><font-awesome-icon v-if="currentOption" :icon="currentOption?.icon" size="lg" class="me-3" />{{ currentOption?.title }}</v-card-title
          >
          <v-card-subtitle>{{ currentOption?.description }}</v-card-subtitle>
          <v-skeleton-loader v-if="initLoading" type="card-avatar,heading,list-item-two-line, actions" class="mx-auto"></v-skeleton-loader>
          <v-expand-transition v-else mode="out-in">
            <keep-alive>
              <component :is="currentOption?.component" v-bind="currentOption?.props" v-on="currentOption?.emits || {}" class="mt-2" />
            </keep-alive>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import wevUserProfileSetting from "@/components/settings/webUserProfileSetting.vue";
  import webAccountSetting from "@/components/settings/webAccountSettings.vue";
  import WebNotificationSettings from "@/components/settings/webNotificationSettings.vue";
  import { computed, markRaw, onMounted, ref, type Ref } from "vue";
  import type { ISettingOption } from "@/interfaces/settingOption.interface";
  import { settingService } from "@/services/setting.service";
  import type { AccountRequestDTO, SettingResponseDTO, UserProfileResponseDTO } from "pinpin_library";
  import type { IAccountSettingFormData } from "@/interfaces/form.interface";
  import { useSnackbarStore } from "@/stores/snackbar.store";
  import type { Isnackbar } from "@/interfaces/snackbar.interface";

  const settingData = ref<SettingResponseDTO>();
  const userProfile = ref<UserProfileResponseDTO>();
  const updateLoading = ref(true);
  const initLoading = computed(() => {
    return settingData.value === undefined || userProfile.value === undefined;
  });
  const snackbarStore = useSnackbarStore();

  const settingsOptions = computed((): ISettingOption[] => [
    {
      title: "帳號設定",
      component: markRaw(webAccountSetting),
      icon: "user",
      props: { isLoading: updateLoading, userProfile: userProfile },
      emits: { update: updateAccountSetting },
      description: "管理你的帳號安全與隱私，包括密碼更新及連結社交平台。",
    },
    {
      title: "個人資料",
      component: markRaw(wevUserProfileSetting),
      icon: "id-badge",
      props: { isLoading: updateLoading, settingData: settingData, userProfile: userProfile },
      emits: {},
      description: "展示你的人特質，讓旅伴盡情見識幽默獨特的個人風格！",
    },
    {
      title: "通知設定",
      component: markRaw(WebNotificationSettings),
      icon: "bell",
      props: { isLoading: updateLoading, settingData: settingData },
      emits: {},
      description: "輕鬆管理通知，讓每則提醒化身旅程中滿滿驚喜與趣味！",
    },
  ]);
  const currentOption: Ref<ISettingOption | null> = ref(null);

  const getSettingData = async (): Promise<SettingResponseDTO> => {
    try {
      return (await settingService.GetSettingData()).data?.data || ({} as SettingResponseDTO);
    } catch {
      return {} as SettingResponseDTO;
    }
  };

  const getUserProfile = async (): Promise<UserProfileResponseDTO> => {
    try {
      return (await settingService.GetUserProfile()).data?.data || ({} as UserProfileResponseDTO);
    } catch {
      return {} as UserProfileResponseDTO;
    }
  };

  const updateAccountSetting = async (accountSettingsFormData: IAccountSettingFormData): Promise<AccountRequestDTO> => {
    updateLoading.value = true;
    try {
      const accountRequestDTO: AccountRequestDTO = {
        email: accountSettingsFormData.email,
        password: accountSettingsFormData.password,
      };

      const response = await settingService.UpdateAccountSetting(accountRequestDTO);
      const snackbar: Isnackbar = {
        timeout: 2000,
        message: "帳號設定更新成功",
        color: "success",
      };
      snackbarStore.PushSnackbar(snackbar);

      return response.data?.data || ({} as AccountRequestDTO);
    } catch {
      return {} as IAccountSettingFormData;
    } finally {
      updateLoading.value = false;
    }
  };

  onMounted(async () => {
    try {
      const [settingResponse, profileResponse] = await Promise.all([getSettingData(), getUserProfile()]);

      settingData.value = settingResponse;
      userProfile.value = profileResponse;

      currentOption.value = settingsOptions.value[0];
      updateLoading.value = false;
    } catch (error) {
      console.error("加載數據失敗", error);
    }
  });
</script>
