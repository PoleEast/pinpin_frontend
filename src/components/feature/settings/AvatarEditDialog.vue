<template>
  <v-dialog v-model="showDialog" max-width="600px" max-height="600px">
    <v-card class="rounded-xl">
      <v-container v-if="!showCutImageView">
        <v-card-title class="text-center d-flex justify-center align-center">
          <span class="text-h4 font-weight-bold text-primary d-flex align-center justify-center">
            <font-awesome-icon icon="image" class="mr-3" />
            更換頭像
          </span>
        </v-card-title>
        <v-card-subtitle class="text-center">上傳頭像，讓旅伴知道誰是行李箱裡藏零食最多的人！</v-card-subtitle>
        <v-card-text class="mt-3 pa-0">
          <v-file-upload v-model="avatarFile" density="compact" title="上傳圖片/拖曳圖片至此" @update:modelValue="editAvatar()">
            <template v-slot:icon><font-awesome-icon icon="pen-ruler" /></template>
          </v-file-upload>
        </v-card-text>
        <v-card-text class="py-1">
          <v-tabs v-model="tabValue" class="mb-3" @update:model-value="dataIteratorPage = 1">
            <v-tab v-for="(data, index) in tabData" :key="data.name" :text="data.name" :value="index"></v-tab>
          </v-tabs>
          <v-tabs-window v-model="tabValue">
            <v-tabs-window-item v-for="(data, index) in tabData" :key="data.name" :value="index">
              <v-container>
                <v-data-iterator :page="dataIteratorPage" :items="data.avatars" items-per-page="5">
                  <template v-slot:default="{ items }">
                    <div class="d-flex flex-wrap justify-center">
                      <div v-for="avatar in items" :key="`avatar-${avatar.raw.id}`">
                        <v-hover>
                          <template v-slot:default="{ isHovering, props }">
                            <v-avatar
                              :image="cloudinaryUrl(avatar.raw.public_id, 'f_auto,q_auto,dpr_auto,c_scale,w_150')"
                              :class="[
                                isHovering ? 'elevation-12 avatar-scale' : 'elevation-4',
                                selectedAvatar === avatar.raw.id ? 'border-lg border-success border-opacity-75' : '',
                              ]"
                              size="70"
                              loading="lazy"
                              class="mx-3 my-1 transition"
                              v-bind="props"
                              @click="selectedAvatar = avatar.raw.id"></v-avatar>
                            <div class="avatar-date text-caption text-center mt-1">
                              {{
                                data.name === "預設頭像"
                                  ? ""
                                  : calculateDaysDifference(avatar.raw.create_at) === 0
                                    ? "今天"
                                    : calculateDaysDifference(avatar.raw.create_at) + "天前"
                              }}
                            </div>
                          </template>
                        </v-hover>
                      </div>
                    </div>
                  </template>
                  <template v-slot:footer="{ pageCount }">
                    <v-divider class="mt-2" color="primary"></v-divider>
                    <v-pagination
                      :length="pageCount"
                      :total-visible="4"
                      density="compact"
                      v-model="dataIteratorPage"
                      class="mt-1"
                      :prev-icon="LeftTriangleIcon"
                      :next-icon="RightTriangleIcon"
                      rounded="lg">
                    </v-pagination>
                  </template>
                </v-data-iterator>
              </v-container>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            size="large"
            block
            class="mb-4 px-1"
            elevation="1"
            variant="flat"
            :loading="updateLoading"
            @click="updateUserProfileAvatar(selectedAvatar)">
            更換
          </v-btn>
        </v-card-actions>
      </v-container>
      <v-container v-else>
        <v-card-title class="text-center flex justify-center align-center">
          <span class="text-h4 font-weight-bold text-primary d-flex align-center justify-center">
            <font-awesome-icon icon="image" class="mr-3" />
            裁切頭像
          </span>
        </v-card-title>
        <v-card-subtitle class="text-center">頭像剪裁中！把你偷吃團友點心被抓包的表情裁掉吧！</v-card-subtitle>
        <v-card-text class="mt-3 pa-0">
          <AppCopper
            v-if="showCutImageView"
            :updateLoading="updateLoading"
            :src="imageUrl"
            :alt="avatarFile?.name"
            @cancel="init"
            @get-image="uploadAvatar"></AppCopper>
        </v-card-text>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
  import { computed, ref, watch } from "vue";
  import { RightTriangleIcon, LeftTriangleIcon } from "@/utils/functionalComponent.utils";
  import { settingService } from "@/services/setting.service";
  import AppCopper from "@/components/common/AppCopper.vue";
  import { USERPROFILE_AVATAR, type AvatarChangeHistoryResponseDTO, type AvatarResponseDTO } from "pinpin_library";
  import { calculateDaysDifference, cloudinaryUrl } from "@/utils/utils.utils";
  import { useAuthStore } from "@/stores/auth.store";
  import { useSnackbarStore } from "@/stores/snackbar.store";

  const showDialog = defineModel<boolean>("showDialog");

  const authStore = useAuthStore();
  const snackbarStore = useSnackbarStore();

  const tabValue = ref(0);
  const dataIteratorPage = ref(1);
  const selectedAvatar = ref<number>();
  const avatarFile = ref<File>();
  const showCutImageView = ref(true);
  const imageUrl = ref<string>("");

  const recentAvatars = ref<AvatarResponseDTO[]>([]);
  const defaultAvatars = ref<AvatarResponseDTO[]>([]);
  const userAvatars = ref<AvatarResponseDTO[]>([]);
  const updateLoading = ref(false);

  const tabData = computed(() => [
    {
      name: "最近使用",
      avatars: recentAvatars.value,
    },
    {
      name: "預設頭像",
      avatars: defaultAvatars.value,
    },
    {
      name: "自訂頭像",
      avatars: userAvatars.value,
    },
  ]);

  /**
   * 顯示裁剪頭像的dialog
   * @description
   * 1. 產生頭像的blob url
   * 2. 顯示裁剪頭像的dialog
   */
  const editAvatar = () => {
    if (avatarFile.value) {
      imageUrl.value = URL.createObjectURL(avatarFile.value);
      showCutImageView.value = true;
    }
  };

  /**
   * 上傳裁剪後的頭像到後端
   * @description
   * 1. 將裁剪後的頭像轉換為blob
   * 2. 將blob轉換為formData
   * 3. 使用settingService上傳頭像
   * 4. 如果上傳成功，將頭像id更新到用戶設定中
   * 5. 如果上傳失敗，顯示錯誤訊息
   * @param {HTMLCanvasElement} image - 裁剪後的頭像canvas元素
   */
  const uploadAvatar = async (image: HTMLCanvasElement) => {
    if (updateLoading.value) {
      return;
    }
    updateLoading.value = true;
    const compressCanvas = compressAvatar(image);

    compressCanvas.toBlob(async (blob) => {
      if (!blob) {
        handleCloseDialogError("頭像上傳失敗，請稍後再試");
        return;
      }

      const formData = new FormData();
      formData.append("avatar", blob);

      try {
        const response = await settingService.UploadAvatar(formData);

        if (response.status !== 201 || !response.data?.data?.id) {
          handleCloseDialogError("頭像上傳失敗，請稍後再試");
          return;
        }

        await updateUserProfileAvatar(response.data.data.id);
      } catch {
        handleCloseDialogError("頭像上傳失敗，請稍後再試");
      }
    });
  };

  const handleCloseDialogError = (message: string) => {
    snackbarStore.PushSnackbar({
      message,
      color: "error",
      timeout: 2000,
    });
    updateLoading.value = false;
    showDialog.value = false;
  };

  const updateUserProfileAvatar = async (avatarId?: number) => {
    if (updateLoading.value) {
      return;
    }
    if (!avatarId) {
      handleCloseDialogError("頭像更新失敗，請稍後再試");
      return;
    }
    const response = await settingService.UpdateUserProfileAvatar(avatarId);

    if (response.status !== 200) {
      handleCloseDialogError("頭像更新失敗，請稍後再試");
      return;
    }
    authStore.AvatarPublicId = response.data?.data?.public_id ?? authStore.AvatarPublicId;

    snackbarStore.PushSnackbar({
      message: "頭像更新成功！",
      color: "success",
      timeout: 2000,
    });
    updateLoading.value = false;
    showDialog.value = false;
  };

  /**
   * 壓縮頭像
   * @description
   * 1. 創建一個新的 canvas
   * 2. 計算壓縮的比例
   * 3. 將圖片畫到新的 canvas上
   * 4. 回傳新的 canvas
   * @param {HTMLCanvasElement} image - 原始的頭像
   * @returns {HTMLCanvasElement} 壓縮後的頭像
   */
  const compressAvatar = (image: HTMLCanvasElement): HTMLCanvasElement => {
    const compressCanvas = document.createElement("canvas");
    const ctx = compressCanvas.getContext("2d");

    const scale = Math.min(USERPROFILE_AVATAR.MAX_WIDTH / image.width, USERPROFILE_AVATAR.MAX_WIDTH / image.height);

    compressCanvas.width = image.width * scale;
    compressCanvas.height = image.height * scale;

    ctx?.drawImage(image, 0, 0, compressCanvas.width, compressCanvas.height);

    return compressCanvas;
  };

  /**
   *  dialogAvatarEdit 的init方法
   * 1.  Reset editAvatar 的所有state
   * 2.  獲取預設頭像、歷史頭像、自訂頭像
   * 3.  將預設頭像、歷史頭像、自訂頭像的public_id轉換為 cloudinary url
   * 4.  將預設頭像、歷史頭像、自訂頭像分別assign到 defaultAvatars,recentAvatars,userAvatars
   * 5.  將 selectedAvatar 設置為預設頭像的id
   * 6.  關閉裁剪頭像的dialog
   */
  const init = async () => {
    showCutImageView.value = false;
    imageUrl.value = "";
    avatarFile.value = undefined;
    updateLoading.value = false;

    //獲取所有頭像

    const defaultAvatarResponse = (await settingService.GetDefaultAvatar()).data.data;
    const defaultAvatarResult = defaultAvatarResponse?.map((item: AvatarResponseDTO) => ({
      ...item,
      public_id: cloudinaryUrl(item.public_id, "f_auto,q_auto,dpr_auto,c_scale,w_150"),
    }));
    //歷史投像需要轉換
    const changeHistoryAvatarResponse = await settingService.GetChangeHistoryAvatar();
    const changeHistoryAvatarResult: AvatarResponseDTO[] =
      changeHistoryAvatarResponse?.data?.data?.map((item: AvatarChangeHistoryResponseDTO) => {
        return {
          id: item.avatar.id,
          public_id: cloudinaryUrl(item.avatar.public_id),
          type: item.avatar.type,
          create_at: item.change_date,
        };
      }) ?? [];

    const userAvatarResponse = (await settingService.GetUserAvatar()).data.data;
    const userAvatarResult = userAvatarResponse?.map((item: AvatarResponseDTO) => {
      return {
        ...item,
        public_id: cloudinaryUrl(item.public_id),
      };
    });

    defaultAvatars.value = Array.isArray(defaultAvatarResult) ? defaultAvatarResult : [];
    recentAvatars.value = Array.isArray(changeHistoryAvatarResult) ? changeHistoryAvatarResult : [];
    userAvatars.value = Array.isArray(userAvatarResult) ? userAvatarResult : [];

    selectedAvatar.value =
      (defaultAvatarResponse ?? []).concat(userAvatarResponse ?? []).find((item) => item.public_id === authStore.AvatarPublicId)?.id ?? undefined;
  };

  watch(showDialog, (value) => {
    if (value) {
      init();
    }
  });
</script>

<style lang="css">
  .transition {
    transition: all 0.1s ease-in-out;
  }

  .avatar-scale {
    transform: scale(1.05);
  }
</style>
