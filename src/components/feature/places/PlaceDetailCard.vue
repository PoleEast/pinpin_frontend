<template>
  <v-dialog :model-value="true" persistent max-width="900">
    <template v-slot:default>
      <v-card>
        <v-img :src="imgUrl" :height="imageMaxHeight + 'px'" cover class="pa-0">
          <div class="d-flex justify-end">
            <v-btn class="rounded-1 ma-2" variant="tonal" color="red-lighten-1">
              <v-tooltip activator="parent" location="bottom">加入最愛</v-tooltip>
              <font-awesome-icon icon="heart" />
            </v-btn>
            <v-btn class="rounded-1 ma-2" variant="tonal" color="deep-orange-darken-2">
              <v-tooltip activator="parent" location="bottom">加入行程</v-tooltip>
              <font-awesome-icon icon="plus" />
            </v-btn>
            <v-btn class="rounded-1 ma-2" variant="tonal" color="green-darken-1">
              <v-tooltip activator="parent" location="bottom">分享至聊天室</v-tooltip>
              <font-awesome-icon icon="comment" />
            </v-btn>
            <v-btn class="rounded-1 ma-2" variant="tonal" color="blue-lighten-1">
              <v-tooltip activator="parent" location="bottom">開啟 Google Maps</v-tooltip>
              <font-awesome-icon icon="up-right-from-square" />
            </v-btn>
          </div>
        </v-img>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-subtitle :title="subtitle">{{ subtitle }}</v-card-subtitle>
        <v-card-item>
          <v-row>
            <v-col cols="4">
              <v-card-item
                class="border align-center justify-center rounded h-100"
                @click="showOpenTimeDetail">
                <v-card-text class="text-center font-weight-bold pb-0 text-h5">
                  {{ spotOpenTime }}
                </v-card-text>
                <v-card-text class="text-center pt-1">營業時間</v-card-text>
              </v-card-item>
            </v-col>
            <v-col cols="4">
              <v-card-item class="border align-center justify-center rounded h-100">
                <v-rating
                  v-model="spotRating"
                  class="pb-2"
                  active-color="warning"
                  hover
                  readonly
                  size="20"
                  length="5"
                  :full-icon="createStarIcon('filled', 'xs')"
                  :empty-icon="createStarIcon('empty', 'xs')"></v-rating>
                <v-card-text class="text-center font-weight-bold py-0">
                  {{ spotRating }}/{{ fullRating }}
                </v-card-text>
                <v-card-text class="text-center pt-1">評分</v-card-text>
              </v-card-item>
            </v-col>
            <v-col cols="4">
              <v-card-item class="border align-center justify-center rounded h-100">
                <v-card-text class="text-center font-weight-bold text-h5 pb-0">
                  {{ spotPrice }}
                </v-card-text>
                <v-card-text class="text-center pt-1">價格</v-card-text>
              </v-card-item>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-card-item class="border">
                <v-card-title>店家資料</v-card-title>
              </v-card-item>
            </v-col>
            <v-col cols="6">
              <v-card-item class="border">
                <v-card-title>營業時間</v-card-title>
              </v-card-item>
            </v-col>
          </v-row>
        </v-card-item>
      </v-card>
    </template>
  </v-dialog>
</template>
<script lang="ts" setup>
  import { ref } from "vue";

  import { createStarIcon } from "@/utils/functionalComponent.utils";

  const imageMaxHeight = ref(200);
  const fullRating = 5;
  const imgUrl =
    "https://res.cloudinary.com/duynzu6ez/image/upload/v1748940979/Avatar/noidvqinf5vzjryzor6t.png";
  const title = "瀧厚炙燒熟成牛排 台北.南港店";
  const subtitle = "忠孝東路七段369號CITYLINK南港店A棟A棟南港車站City Link3樓";

  const spotOpenTime = "24hr";
  const spotRating = "3.5";
  const spotPrice = "$$";
  const showOpenTimeDetail = () => {
    console.log("showOpenTimeDetail");
  };
</script>
