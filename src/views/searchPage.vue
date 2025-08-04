<template>
  <v-container fluid class="mt-4">
    <v-row>
      <v-col cols="12" md="3">
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
                      v-model="starRating"
                      length="5"
                      active-color="warning"
                      hover
                      half-increments
                      size="55"
                      clearable
                      :full-icon="createStarIcon('filled', 'lg')"
                      :empty-icon="createStarIcon('empty', 'lg')"></v-rating>
                  </v-card-text>
                </v-card-item>
                <!-- 放棄實作營業時段功能，google api 不支援，要實作複雜度與成本過高 -->
                <!-- <v-card-item class="pt-0">
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
                </v-card-item> -->
                <v-card-item>
                  <!-- TODO:需要告訴使用者區間是多少到多少 -->
                  <v-card-subtitle>價格區間</v-card-subtitle>
                  <v-card-text>
                    <v-range-slider
                      ripple
                      v-model="priceRange"
                      thumb-label="always"
                      min="0"
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
                  <v-card-subtitle>排序依據</v-card-subtitle>
                  <v-card-text class="px-0">
                    <!-- TODO: 實作排序功能 -->
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
      <v-col cols="12" md="9">
        <!-- 依據使用者興趣內容推薦地點 -->
        <v-card elevation="2">
          <v-card-title class="text-h5 font-weight-bold d-flex justify-space-between align-center">
            <v-sheet>
              <span>
                <font-awesome-icon icon="map-location-dot" size="lg" class="mr-2" />
                {{ resultkeyword ? resultkeyword + "的" : "" }}搜尋結果
              </span>
            </v-sheet>
            <!-- TODO:顯示格式實作 -->
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
          <v-card-subtitle class="mb-2" v-if="locations.length">滑動瀏覽、點擊收藏，把喜歡的地方都加進你的旅遊口袋名單~</v-card-subtitle>
          <v-card-item>
            <!-- TODO:實作無限滾動 -->
            <v-row>
              <v-col cols="12" md="4" v-for="location in locations" :key="location.Id">
                <PlaceCard :location="location" :image-max-height="locationCardImageMaxHeight"></PlaceCard>
              </v-col>
            </v-row>
          </v-card-item>
          <v-card-actions class="d-block">
            <template v-if="!nextPageToken && lastTextSearchOption">
              <v-alert class="justify-center" text="看來我們已經把這裡的寶藏都挖出來了！試試換個關鍵字，說不定會有意外驚喜" variant="plain"></v-alert>
            </template>
            <template v-else-if="nextPageToken && lastTextSearchOption">
              <div ref="nextpageLoaderTrigger">
                <v-alert class="justify-center" text="搜尋雷達全開！正在找更多好地方..." variant="plain"></v-alert>
                <v-progress-linear indeterminate color="primary" class="w-50 mx-auto mb-2" opacity="0.8"></v-progress-linear>
              </div>
            </template>
            <template v-else>
              <v-alert class="justify-center" text="搜尋全世界的美食、景點、體驗，把想去的地方都收進行程裡！" variant="plain"></v-alert>
            </template>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
  import { onMounted, onUnmounted, ref, watch, type Ref } from "vue";
  import PlacesAutocompleteInput from "@/components/feature/search/PlacesAutocompleteInput.vue";
  import PlaceCard from "@/components/feature/places/PlaceCard.vue";

  import {
    createNumberIcon,
    createTriangleIcon,
    createStarIcon,
    createTextFieldRules,
    isValidKey,
    isStringOrStringArray,
    isNumericString,
  } from "@/utils/index";
  import type { IChip, ILocationCard, ITextSearchOption } from "@/interfaces";
  import { GOOGLE_PLACE_TYPE_MAP, GOOGLE_PLACE_TYPE_OPTIONS, type GooglePlaceType } from "@/constants/googlePlaceType.constant";
  import { generateUUID } from "@/utils/string.utils";
  import { searchService } from "@/services";
  import { useSnackbarStore } from "@/stores";
  import { useRoute } from "vue-router";
  import router from "@/router";
  import { GOOGLE_MAPS_PLACE_PRICE_LEVEL } from "pinpin_library";
  import { BUSSINESS_PRICE_OPTIONS } from "@/constants/BusinessPrice.constant";

  const locationCardImageMaxHeight = 200;
  let observer: IntersectionObserver | null = null;
  const sessionToken = ref<string>(generateUUID());
  const searchTextRule = createTextFieldRules("關鍵字", 1, 50, true);
  const loading = ref(false);
  const nextpageLoaderTrigger: Ref<HTMLElement | null> = ref(null);

  // #region 搜尋相關

  // const businesstimeSelect = ref<BusinessTimes>("UNLIMITED");
  // const businessTimeSpecificDays = ref([0, 4]);
  // const BusinessTimeSpecificTimeRange = ref([0, 24]);
  const starRating = ref<number>(0);
  const piriceType = BUSSINESS_PRICE_OPTIONS.filter((type) => type.index !== undefined).map((type) => type.label);
  const priceRange = ref([0, piriceType.length - 1]);
  const placeTypes: IChip[] = GOOGLE_PLACE_TYPE_OPTIONS.map((type) => ({
    text: type.label,
    value: type.value,
  }));
  const placeType = ref<GooglePlaceType | undefined>();
  const route = useRoute();

  // #endregion

  // #region 搜尋結果相關

  const viewMode = ref("grid");
  const locations = ref<ILocationCard[]>([]);
  const placesSort = ref<string[]>([]);
  const resultkeyword = ref("");

  const nextPageToken = ref<string>("");
  const isNewNextPageToken = ref(false);
  const lastTextSearchOption = ref<ITextSearchOption | undefined>();
  const pageSize = 12;

  //#endregion

  const searchByText = async (keyword: string) => {
    if (!keyword) {
      useSnackbarStore().PushSnackbar({
        message: "請輸入關鍵字",
        color: "warning",
        timeout: 2000,
      });
      return;
    }

    loading.value = true;

    locations.value = [];
    nextPageToken.value = "";

    const textSearchOption: ITextSearchOption = {
      keyword: placeType.value ? keyword + " " + GOOGLE_PLACE_TYPE_MAP[placeType.value].label : keyword,
      priceLevel: BUSSINESS_PRICE_OPTIONS.slice(priceRange.value[0], priceRange.value[1] + 1).map((option) => option.value),
      primaryType: placeType.value ? GOOGLE_PLACE_TYPE_MAP[placeType.value].textSearchItem : undefined,
      pageSize: pageSize,
      maxImageHeight: locationCardImageMaxHeight,
      rating: starRating.value ? starRating.value : undefined,
    };

    triggerSearchByUrl(textSearchOption);
  };

  const loadNextPage = (textSearchOption: ITextSearchOption, nextPageToken: string) => {
    textSearchOption.nextPageToken = nextPageToken;
    processTextSearchResult(textSearchOption);
  };

  const triggerSearchByUrl = (textSearchOption: ITextSearchOption) => {
    router.push({
      query: {
        keyword: textSearchOption.keyword,
        priceLevel: textSearchOption.priceLevel,
        primaryType: textSearchOption.primaryType,
        rating: textSearchOption.rating,
      },
    });
  };

  const processTextSearchResult = async (textSearchOption: ITextSearchOption) => {
    try {
      console.log(textSearchOption);
      const response = await searchService.GetTextSearchLocation(textSearchOption);

      if (!response.data.data) {
        useSnackbarStore().PushSnackbar({
          message: "我們不認識你說的地方TT，你要查查看其他地方嗎?",
          color: "warning",
          timeout: 2000,
        });
        return;
      }

      const result: ILocationCard[] =
        response.data.data.locations.map(
          (location): ILocationCard => ({
            placeName: location.name,
            rating: location.rating,
            price: location.priceLevel,
            primaryType: location.primaryType,
            address: location.address,
            businssStuts: location.businessStatus,
            phone: location.phoneNumber,
            Id: location.id,
            photoURL: location.photoURL,
            IconURL: location.IconMaskBaseURL,
            userRatingCount: location.userRatingCount,
          }),
        ) ?? [];

      locations.value.push(...result);

      nextPageToken.value = response.data.data?.nextPageToken ?? "";
    } catch {
      nextPageToken.value = "";
    } finally {
      loading.value = false;
      lastTextSearchOption.value = textSearchOption;
    }
  };

  const searchByPlaceId = (PlaceId: string) => {
    console.log("Searching for:", PlaceId);
  };

  const validatePrimaryType = (primaryType: unknown, required: boolean = false) => {
    if (!required && !primaryType) return true;

    if (typeof primaryType !== "string") return false;

    if (!GOOGLE_PLACE_TYPE_OPTIONS.some((type) => type.textSearchItem === primaryType)) return false;

    return true;
  };

  const validateRating = (rating: unknown, required: boolean = false): rating is number => {
    if (!required && !rating) return true;

    if (!isNumericString(rating)) return false;

    if (rating < 0 || rating > 5 || rating % 0.5) return false;

    return true;
  };

  const validatePriceLevel = (priceLevel: unknown, required: boolean = false) => {
    if (!required && !priceLevel) return true;

    if (!isStringOrStringArray(priceLevel)) return false;

    if (!isValidKey(priceLevel, GOOGLE_MAPS_PLACE_PRICE_LEVEL)) return false;

    return true;
  };

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (lastTextSearchOption.value && nextPageToken.value && isNewNextPageToken.value) {
            isNewNextPageToken.value = false;
            loadNextPage(lastTextSearchOption.value, nextPageToken.value);
          }
        }
      },
      {
        threshold: 1,
      },
    );
  });

  watch(
    nextpageLoaderTrigger,
    (element) => {
      if (!observer) return;

      if (element) {
        observer.observe(element);
      } else {
        observer.disconnect();
      }
    },
    {
      flush: "post",
    },
  );

  watch(
    () => nextPageToken.value,
    (newalue, oldValue) => {
      isNewNextPageToken.value = newalue !== oldValue && newalue !== "";
    },
  );

  watch(
    () => route.query,
    (query) => {
      if (!validatePriceLevel(query.priceLevel) || !validatePrimaryType(query.primaryType) || !validateRating(query.rating) || !query.keyword) {
        router.replace({ query: {} });
        return;
      }

      const textSearchOption: ITextSearchOption = {
        keyword: query.keyword as string,
        priceLevel: query.priceLevel as string[],
        primaryType: query.primaryType as string,
        pageSize: pageSize,
        maxImageHeight: locationCardImageMaxHeight,
        rating: query.rating,
      };

      processTextSearchResult(textSearchOption);
    },
    {
      immediate: true,
    },
  );

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });
</script>
