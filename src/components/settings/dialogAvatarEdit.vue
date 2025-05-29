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
          <v-tabs v-model="tabValue" class="mb-3">
            <v-tab v-for="tag in tabTags" :key="tag" :text="tag"></v-tab>
          </v-tabs>
          <v-tabs-window v-model="tabValue">
            <v-tabs-window-item v-for="tag in tabTags" :key="tag" :value="tag">
              <v-container>
                <v-data-iterator :page="dataIteratorPage" :items="recentAvatars" items-per-page="5">
                  <template v-slot:default="{ items }">
                    <div class="d-flex flex-wrap justify-center">
                      <div v-for="avatar in items" :key="avatar.raw.id">
                        <v-hover>
                          <template v-slot:default="{ isHovering, props }">
                            <v-avatar
                              :image="avatar.raw.url"
                              size="70"
                              class="mx-3 my-1 transition"
                              :class="[
                                isHovering ? 'elevation-12 avatar-scale' : 'elevation-4',
                                selectedAvatar === avatar.raw.id ? 'border-lg border-success border-opacity-75' : '',
                              ]"
                              v-bind="props"
                              @click="selectedAvatar = avatar.raw.id"></v-avatar>
                            <div class="avatar-date text-caption text-center mt-1">{{ avatar.raw.date }}</div>
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
          <v-btn color="primary" size="large" block class="mb-4 px-1" elevation="1" variant="flat"> 更換 </v-btn>
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
          <web-copper v-if="showCutImageView" :src="imageUrl" :alt="avatarFile?.name" @cancel="init" @get-image="updateAvatar"></web-copper>
        </v-card-text>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
  import { ref, watch } from "vue";
  import { RightTriangleIcon, LeftTriangleIcon } from "@/utils/functionalComponent.utils";
  import { settingService } from "@/services/setting.service";
  import WebCopper from "../common/webCopper.vue";
  import { USERPROFILE_AVATAR } from "pinpin_library";

  const showDialog = defineModel<boolean>("showDialog");

  const tabTags = ["最近使用", "預設頭像"];
  const tabValue = ref(tabTags[0]);
  const dataIteratorPage = ref(1);
  const selectedAvatar = ref<number>();
  const avatarFile = ref<File>();
  const showCutImageView = ref(true);
  const imageUrl = ref<string>("");

  // 示例數據 - 實際應該從 API 獲取
  const recentAvatars = ref<{ id: number; date: string; url: string }[]>([]);
  // const defaultAvatars = ref([]);

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

  const updateAvatar = async (image: HTMLCanvasElement) => {
    const compressCanvas = compressAvatar(image);

    compressCanvas.toBlob(async (blob) => {
      if (!blob) return;

      const formData = new FormData();
      formData.append("avatar", blob);

      const response = await settingService.UpdateUserProfileAvatar(formData);
      console.log(response);
    });
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

  const init = () => {
    showCutImageView.value = false;
    imageUrl.value = "";
    avatarFile.value = undefined;
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
