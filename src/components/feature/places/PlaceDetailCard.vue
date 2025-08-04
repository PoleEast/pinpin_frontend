<template>
  <v-dialog :model-value="true" persistent max-width="900">
    <template v-slot:default>
      <v-card>
        <v-row>
          <v-col cols="9">
            <v-img :src="imgUrl" :height="imageMaxHeight + 'px'" cover class="pa-0"></v-img>
          </v-col>
          <v-col cols="3" class="align-center justify-center px-0">
            <v-card-item class="border align-center justify-center rounded" @click="showOpenTimeDetail">
              <v-card-text class="text-center font-weight-bold pb-0">{{ spotOpenTime }}</v-card-text>
              <v-card-text class="text-center pt-1">營業時間</v-card-text>
            </v-card-item>

            <v-card-item class="border align-center justify-center rounded">
              <v-card-text class="text-center font-weight-bold pb-0">{{ spotRating }}/{{ fullRating }}</v-card-text>
              <v-card-text class="text-center pt-1">評分</v-card-text>
            </v-card-item>

            <v-card-item class="border align-center justify-center rounded">
              <v-card-text class="text-center font-weight-bold pb-0">{{ spotPrice }}</v-card-text>
              <v-card-text class="text-center pt-1">價格</v-card-text>
            </v-card-item>
          </v-col>
        </v-row>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-subtitle :title="subtitle">{{ subtitle }}</v-card-subtitle>
        <v-card-item>
          <v-row>
            <v-col cols="4">
              <v-card-item class="border align-center justify-center rounded" @click="showOpenTimeDetail">
                <v-card-text class="text-center font-weight-bold pb-0">{{ spotOpenTime }}</v-card-text>
                <v-card-text class="text-center pt-1">營業時間</v-card-text>
              </v-card-item>
            </v-col>
            <v-col cols="4">
              <v-card-item class="border align-center justify-center rounded">
                <v-card-text class="text-center font-weight-bold pb-0">{{ spotRating }}/{{ fullRating }}</v-card-text>
                <v-card-text class="text-center pt-1">評分</v-card-text>
              </v-card-item>
            </v-col>
            <v-col cols="4">
              <v-card-item class="border align-center justify-center rounded">
                <v-card-text class="text-center font-weight-bold pb-0">{{ spotPrice }}</v-card-text>
                <v-card-text class="text-center pt-1">價格</v-card-text>
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

  const imageMaxHeight = ref(200);
  const fullRating = 5;
  const imgUrl = "https://res.cloudinary.com/duynzu6ez/image/upload/v1748940979/Avatar/noidvqinf5vzjryzor6t.png";
  const title = "瀧厚炙燒熟成牛排 台北.南港店";
  const subtitle = "忠孝東路七段369號CITYLINK南港店A棟A棟南港車站City Link3樓";

  const spotOpenTime = "24hr";
  const spotRating = "4";
  const spotPrice = "$$";

  const showOpenTimeDetail = () => {
    console.log("showOpenTimeDetail");
  };
</script>
