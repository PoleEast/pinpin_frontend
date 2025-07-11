<template>
  <v-container fluid class="mt-4">
    <v-row>
      <v-col cols="3">
        <v-card elevation="2">
          <v-card-title class="text-h5 font-weight-bold">
            <font-awesome-icon icon="magnifying-glass" size="lg" />
            搜尋景點
          </v-card-title>
          <v-card-subtitle>找找那些讓你捨不得回家的地方</v-card-subtitle>
          <v-card-item class="pb-0">
            <PlacesAutocompleteInput
              :place-type="placeType"
              :session-token="sessionToken"
              label="搜尋"
              placeholder="大阪 鐵板燒"
              class="mt-2 mb-0"
              hide-no-data
              return-object
              :custom-filter="() => true"
              :search-text-rule="searchTextRule"
              validate-on="input"
              @search-by-place-id="searchByPlaceId"
              @search-by-text="searchByText"></PlacesAutocompleteInput>
          </v-card-item>
          <v-card-item class="pt-0">
            <v-chip-group class="d-flex flex-wrap" column :close="false" v-model="placeType">
              <v-chip v-for="(placeType, index) in placeTypes" :key="index" color="primary" class="ma-1 d-flex align-center" :value="placeType.value">
                <font-awesome-icon icon="xmark" class="mr-1" />
                <span>{{ placeType.text }}</span>
              </v-chip>
            </v-chip-group>
          </v-card-item>
          <v-expansion-panels variant="accordion" rounded="0" color="gray-500">
            <v-expansion-panel title="篩選" :collapse-icon="createTriangleIcon('up')" :expand-icon="createTriangleIcon('down')">
              <v-expansion-panel-text>
                <v-card-item>
                  <v-card-subtitle>訪客評分</v-card-subtitle>
                  <v-card-text class="pa-0">
                    <v-rating
                      title="訪客評分"
                      :model-value="starRating"
                      active-color="warning"
                      hover
                      size="55"
                      :full-icon="createStarIcon('filled', 'lg')"
                      :empty-icon="createStarIcon('empty', 'lg')">
                    </v-rating>
                  </v-card-text>
                </v-card-item>
                <v-card-item class="pt-0">
                  <v-card-subtitle>營業時間</v-card-subtitle>
                  <v-card-text class="py-1 px-0">
                    <v-select v-model="businesstimeSelect" :items="BUSINESS_TIME_OPTIONS" item-value="value" item-title="label"></v-select>
                    <v-card-item v-if="businesstimeSelect == 'SPECIFIC_DAYS' || businesstimeSelect == 'SPECIFIC_TIME'" class="pt-0">
                      <v-card-subtitle>營業日</v-card-subtitle>
                      <v-chip-group class="d-flex flex-wrap" column multiple :close="false" v-model="businessTimeSpecificDays">
                        <v-chip
                          v-for="(category, index) in ['一', '二', '三', '四', '五', '六', '日']"
                          :value="category"
                          :key="index"
                          class="ma-1"
                          color="primary"
                          text-color="white">
                          {{ category }}
                        </v-chip>
                      </v-chip-group>
                    </v-card-item>
                    <v-card-item v-if="businesstimeSelect == 'SPECIFIC_TIME'" class="pt-0 pa-0">
                      <v-card-subtitle class="ms-2">營業時段</v-card-subtitle>
                      <v-range-slider
                        ripple
                        v-model="BusinessTimeSpecificTimeRange"
                        class="mt-5 mx-6"
                        min="0"
                        max="24"
                        step="1"
                        thumb-size="15"
                        thumb-label="always">
                        <template v-slot:thumb-label="{ modelValue }">
                          <span>{{ modelValue }}:00</span>
                        </template>
                      </v-range-slider>
                    </v-card-item>
                  </v-card-text>
                </v-card-item>
                <v-card-item>
                  <!-- TODO:需要告訴使用者區間是多少到多少 -->
                  <v-card-subtitle>價格區間</v-card-subtitle>
                  <v-card-text>
                    <v-range-slider
                      ripple
                      v-model="priceRange"
                      thumb-label="always"
                      :max="piriceType.length - 1"
                      step="1"
                      thumb-size="15"
                      :ticks="piriceType"
                      class="mt-1">
                      <template v-slot:thumb-label="{ modelValue }">
                        <span>{{ piriceType[modelValue] }}</span>
                      </template>
                    </v-range-slider>
                  </v-card-text>
                </v-card-item>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel title="排序" :collapse-icon="createTriangleIcon('up')" :expand-icon="createTriangleIcon('down')">
              <v-expansion-panel-text>
                <v-card-item>
                  <v-card-subtitle>排序依據</v-card-subtitle
                  ><v-card-text class="px-0">
                    <v-chip-group column multiple :close="false" v-model="placesSort" @update:model-value="console.log(placesSort)">
                      <v-chip
                        v-for="(category, index) in ['評分', '價格', '評分人數', '營業狀態']"
                        :value="category"
                        :key="index"
                        class="ma-1"
                        :text="category"
                        color="primary"
                        text-color="white"
                        :prepend-icon="placesSort.includes(category) ? createNumberIcon(placesSort.indexOf(category) + 1) : ''"></v-chip>
                    </v-chip-group>
                  </v-card-text>
                </v-card-item>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
      <v-col cols="9">
        <!-- 依據使用者興趣內容推薦地點 -->
        <v-card elevation="2">
          <v-card-title class="text-h5 font-weight-bold d-flex justify-space-between align-center">
            <v-sheet>
              <span><font-awesome-icon icon="map-location-dot" size="lg" class="mr-2" />搜尋結果</span>
            </v-sheet>
            <v-btn-toggle color="primary" density="compact" border :model-value="viewMode" mandatory>
              <v-tooltip text="表格" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-btn value="grid">
                    <font-awesome-icon v-bind="props" icon="table" size="lg" />
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip text="列表" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-btn value="list">
                    <font-awesome-icon v-bind="props" icon="table-list" size="lg" />
                  </v-btn>
                </template>
              </v-tooltip>
            </v-btn-toggle>
          </v-card-title>
          <v-card-subtitle>找到這些景點</v-card-subtitle>
          <PlaceCard v-for="place in places" :place="place" :key="place.placeId"></PlaceCard>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
  import { ref } from "vue";
  import PlacesAutocompleteInput from "@/components/feature/search/PlacesAutocompleteInput.vue";
  import PlaceCard from "@/components/feature/search/PlaceCard.vue";

  import { type BusinessTimes, BUSINESS_TIME_OPTIONS } from "@/constants";
  import { createNumberIcon, createTriangleIcon, createStarIcon, createTextFieldRules } from "@/utils/index";
  import type { IChip } from "@/interfaces";
  import { GOOGLE_PLACE_TYPE_OPTIONS, type GooglePlaceType } from "@/constants/googlePlaceType.constant";
  import { generateUUID } from "@/utils/string.utils";
  import { searchService } from "@/services";

  const sessionToken = ref<string>(generateUUID());
  const searchTextRule = createTextFieldRules("關鍵字", 1, 50, true);

  // #region 搜尋相關
  const starRating = ref(5);
  const businesstimeSelect = ref<BusinessTimes>("UNLIMITED");
  const businessTimeSpecificDays = ref([0, 4]);
  const piriceType = ["$", "$$", "$$$", "$$$$"];
  const priceRange = ref([0, 2000]);
  const BusinessTimeSpecificTimeRange = ref([0, 24]);
  const placeTypes: IChip[] = GOOGLE_PLACE_TYPE_OPTIONS.map((type) => ({
    text: type.label,
    value: type.value,
  }));
  const placeType = ref<GooglePlaceType | undefined>();
  // #endregion

  // #region 搜尋結果相關
  const viewMode = ref("grid");
  const places = ref<object[]>([]);
  const placesSort = ref<string[]>([]);

  // const searchResultTitle: string[] = [
  //   "太棒了！我們為你挖掘出 {數量} 個精彩去處，看看哪些能征服你的旅伴！",
  //   "雖然選擇不多，但這 {數量} 個地方絕對是當地的隱藏寶石！",
  //   "唉呀！這個關鍵字讓我們迷路了，不如換個方向繼續探索？",
  // ];

  const searchByText = async (keyword: string) => {
    const response = await searchService.GetTextSearchLocation(keyword);
    places.value =
      response.data.data?.locations.map((place) => ({
        placeName: place.name,
        rating: place.rating,
        price: place.priceLevel,
        primaryType: place.primaryType,
        address: place.address,
        businssStuts: place.businessStatus,
        phone: place.phoneNumber,
      })) || [];
  };

  const searchByPlaceId = (PlaceId: string) => {
    console.log("Searching for:", PlaceId);
  };
</script>
