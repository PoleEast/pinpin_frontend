<template>
  <v-card>
    <v-img :src="imgUrl" :height="imageMaxHeight + 'px'" cover class="pa-0">
      <div class="d-flex flex-column justify-space-between h-100">
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
        <div class="d-flex justify-start px-3 pb-2 pt-3">
          <img
            src="\src\assets\google_logo\GoogleMaps_Logo_WithDarkOutline_1x.png"
            style="height: 16px; min-height: 16px; max-height: 19px"
            alt="Google Maps" />
        </div>
      </div>
    </v-img>
    <v-card-title class="text-h5 font-weight-bold pb-0">{{ title }}</v-card-title>
    <v-card-subtitle :title="subtitle">{{ subtitle }}</v-card-subtitle>
    <v-card-item>
      <v-row>
        <v-col cols="4">
          <v-card
            class="rounded-lg align-center justify-center mb-2 custom-hover-card"
            hover
            variant="tonal">
            <v-card-text class="text-center font-weight-bold pb-0 text-h5">
              {{ spotOpenTime }}
            </v-card-text>
            <v-card-text class="text-center pt-1">營業時間</v-card-text>
          </v-card>
          <v-card
            class="rounded-lg d-flex flex-column align-center justify-center mb-2 custom-hover-card"
            hover
            elevation="0">
            <v-rating
              v-model="spotRating"
              class="pb-2"
              active-color="warning"
              hover
              readonly
              size="20"
              length="5"
              :full-icon="createStarIcon('filled', { size: 'xs' })"
              :empty-icon="createStarIcon('empty', { size: 'xs' })"></v-rating>
            <v-card-text
              class="text-center font-weight-bold py-0 d-flex align-center custom-hover-card">
              {{ spotRating }}/{{ fullRating }}
              <v-card-subtitle class="text-subtitle-2 pa-0">
                ({{ userRatingCount }})
              </v-card-subtitle>
            </v-card-text>
            <v-card-text class="text-center pt-1">評分</v-card-text>
          </v-card>
          <v-card class="rounded-lg align-center justify-center mb-1" hover variant="tonal">
            <v-card-text class="text-center font-weight-bold text-h5 pb-0">
              {{ spotPrice }}
            </v-card-text>
            <v-card-text class="text-center pt-1">價格</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="8">
          <v-card-item class="pa-0 h-100">
            <v-expansion-panels
              v-model="openPanels"
              variant="accordion"
              color="primary"
              elevation="0"
              mandatory
              ripple>
              <v-expansion-panel
                title="營業時間"
                :collapse-icon="createTriangleIcon('up')"
                :expand-icon="createTriangleIcon('down')">
                <v-expansion-panel-text class="border border-gray-300 expansion-text-pa-0">
                  <v-card-text
                    v-for="(openingHour, index) in openingHours"
                    :key="index"
                    class="text-center py-1"
                    :class="{
                      'bg-gray-100': index % 2 === 1,
                      'border-b': index < openingHours.length - 1,
                      'text-gray-900': index % 2 === 1,
                    }">
                    <p class="text-subtitle-1 opacity-70">
                      {{ openingHour.dayRange.start }} - {{ openingHour.dayRange.end }}
                    </p>
                    <p class="text-subtitle-1">
                      {{ openingHour.openingTime.start }} - {{ openingHour.openingTime.end }}
                    </p>
                  </v-card-text>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel
                title="店家資料"
                :collapse-icon="createTriangleIcon('up')"
                :expand-icon="createTriangleIcon('down')">
                <v-expansion-panel-text class="rounded-b-lg border border-gray-300">
                  <v-table density="compact">
                    <tbody>
                      <tr>
                        <td class="text-subtitle-1">類別:</td>
                        <td class="text-right">
                          <v-chip label class="font-weight-medium my-1">
                            {{ primaryType }}
                          </v-chip>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-subtitle-1">電話:</td>
                        <td class="font-weight-medium text-right">{{ telephone }}</td>
                      </tr>
                      <tr>
                        <td class="text-subtitle-1">國家:</td>
                        <td class="font-weight-medium text-right">{{ country }}</td>
                      </tr>
                      <tr>
                        <td class="text-subtitle-1">狀態:</td>
                        <td class="font-weight-medium text-right">{{ status }}</td>
                      </tr>
                      <tr>
                        <td class="text-subtitle-1">時區:</td>
                        <td class="font-weight-medium text-right">{{ timezone }}</td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel
                title="當地天氣預報"
                :collapse-icon="createTriangleIcon('up')"
                :expand-icon="createTriangleIcon('down')">
                <v-expansion-panel-text class="border border-gray-300 expansion-text-pa-0">
                  <CurrentWeatherCard />
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-item>
        </v-col>
      </v-row>
    </v-card-item>
    <v-card-item>
      <v-card-title>熱門評論</v-card-title>
      <v-card-subtitle>看看去過的人都怎麼說，讓評價成為你的最佳旅遊指南</v-card-subtitle>
      <v-card-item class="px-1 pt-3">
        <v-hover v-for="(review, index) in reviews" :key="index">
          <template #default="{ isHovering, props }">
            <v-card
              v-bind="props"
              class="rounded-lg mb-2 pa-2 custom-hover-card"
              :variant="isHovering ? 'tonal' : 'flat'"
              hover>
              <v-card-title>
                <v-avatar>
                  <v-img :src="review.userAvatar" height="32" width="32" />
                </v-avatar>
                {{ review.userName }}
              </v-card-title>
              <v-card-subtitle class="d-flex flex-row">
                <v-rating
                  v-model="review.rating"
                  active-color="warning"
                  class="pe-2"
                  hover
                  readonly
                  size="20"
                  length="5"
                  :full-icon="createStarIcon('filled', { size: 'xs' })"
                  :empty-icon="createStarIcon('empty', { size: 'xs' })"></v-rating>
                <span class="text-subtitle-2">{{ review.date }}</span>
              </v-card-subtitle>
              <v-card-text>
                {{ review.comment }}
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
        <v-tooltip target="cursor" text="前往 Google Maps !">
          <template v-slot:activator="{ props }">
            <v-alert
              v-bind="props"
              class="justify-center cursor-pointer"
              text="更多評論與照片都在 Google Map，一鍵直達！"
              variant="plain"
              @click="openGoogleMaps"></v-alert>
          </template>
        </v-tooltip>
      </v-card-item>
    </v-card-item>
  </v-card>
</template>
<script lang="ts" setup>
  import { ref } from "vue";
  import CurrentWeatherCard from "@/components/feature/weather/CurrentWeatherCard.vue";

  import { createStarIcon } from "@/utils/functionalComponent.utils";
  import type { OpeningHours } from "@/interfaces";
  import { createTriangleIcon } from "@/utils/index";

  const imageMaxHeight = ref(200);
  const fullRating = 5;
  const openPanels = ref(0);
  const imgUrl =
    "https://res.cloudinary.com/duynzu6ez/image/upload/v1748940979/Avatar/noidvqinf5vzjryzor6t.png";
  const title = "瀧厚炙燒熟成牛排 台北.南港店";
  const subtitle = "忠孝東路七段369號CITYLINK南港店A棟A棟南港車站City Link3樓";

  const spotOpenTime = "24hr";
  const spotRating = "3.5";
  const spotPrice = "$$";
  const country = "台灣";
  const telephone = "02-1234-5678";
  const primaryType = "餐廳";
  const userRatingCount = 4112;
  const status = "營業中";
  const timezone = "Asia/Taipei";

  const openingHours = ref<OpeningHours[]>([
    {
      dayRange: {
        start: "星期一",
        end: "星期四",
      },
      openingTime: {
        start: "00:00",
        end: "23:59",
      },
    },
    {
      dayRange: {
        start: "星期五",
        end: "星期五",
      },
      openingTime: {
        start: "00:00",
        end: "23:59",
      },
    },
    {
      dayRange: {
        start: "星期六",
        end: "星期六",
      },
      openingTime: {
        start: "00:00",
        end: "23:59",
      },
    },
  ]);

  const reviews = ref([
    {
      userName: "靖菱瑛",
      userAvatar:
        "https://res.cloudinary.com/duynzu6ez/image/upload/v1748940979/Avatar/noidvqinf5vzjryzor6t.png",
      rating: 3.5,
      date: "1 週前",
      comment:
        "排餐沒有很驚艷，羊排有點生咬不太動，鴨胸皮很肥韌，反倒是羅宋湯很不錯，三個人吃了兩千多，CP值還好…",
    },
    {
      userName: "小明",
      userAvatar:
        "https://res.cloudinary.com/duynzu6ez/image/upload/v1748940979/Avatar/noidvqinf5vzjryzor6t.png",
      rating: 4.0,
      date: "2 週前",
      comment: "牛排的熟度剛好，服務態度也很好，環境舒適，值得推薦！",
    },
    {
      userName: "小華",
      userAvatar:
        "https://res.cloudinary.com/duynzu6ez/image/upload/v1748940979/Avatar/noidvqinf5vzjryzor6t.png",
      rating: 5.0,
      date: "3 週前",
      comment: "非常棒的用餐體驗，牛排非常嫩，會再來！",
    },
  ]);

  const openGoogleMaps = () => {
    window.open("https://maps.google.com", "_blank", "noopener,noreferrer");
  };
</script>
<style scoped>
  :deep(.v-expansion-panel-text__wrapper) {
    padding: 0 !important;
  }

  .custom-hover-card:hover {
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15) !important;
    cursor: default;
  }

  .fab-offset {
    right: -28px;
    top: 50%;
    transform: translateY(-50%);
  }

  .weather-icon {
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  }
</style>
