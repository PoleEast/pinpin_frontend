<template>
  <v-autocomplete
    :items="autocompleteItems"
    :item-value="(item) => item.placeId"
    :menu-props="{
      minWidth: 'auto',
      maxWidth: '0',
    }"
    :focused="errorMessages !== ''"
    menu-icon=""
    :loading="loading"
    v-model:search="searchText"
    v-model="searchObject"
    :error-messages="errorMessages"
    :error="errorMessages !== ''"
    @keydown.enter="searchByText(searchText)"
    @blur="errorMessages = ''"
    @update:search="autocompleteUpdateSearchText(searchText, sessionToken, includedPrimaryTypes)"
    @update:model-value="searchByPlaceId">
    <template #append-inner>
      <font-awesome-icon
        icon="magnifying-glass"
        @click="searchByText(searchText)"
        class="cursor-pointer mx-1" />
    </template>
    <template #item="{ props, item }">
      <v-list-item class="overflow-hidden" v-bind="props" :key="item.raw.placeId">
        <v-list-item-subtitle class="overflow-hidden">
          {{ item.raw.subtitle }}
        </v-list-item-subtitle>
      </v-list-item>
    </template>
    <template #append-item>
      <div class="d-flex justify-end px-3 pb-2 pt-3">
        <img
          src="\src\assets\google_logo\GoogleMaps_Logo_Gray_1x.png"
          max-height="19px"
          min-height="16px"
          alt="Google Maps" />
      </div>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";
  import { debounce } from "perfect-debounce";
  import {
    GOOGLE_PLACE_TYPE_MAP,
    type GooglePlaceType,
  } from "@/constants/googlePlaceType.constant";
  import { searchService } from "@/services";

  //#region variables
  const searchText = ref<string>("");
  const errorMessages = ref<string>("");
  const loading = ref(false);
  const autocompleteItems = ref<
    {
      title: string;
      subtitle: string;
      placeId: string;
    }[]
  >([]);
  const searchObject = ref<{
    title: string;
    subtitle: string;
    placeId: string;
  }>();

  const emit = defineEmits<{
    (e: "searchByPlaceId", value: string): void;
    (e: "searchByText", value: string): void;
  }>();

  const props = defineProps<{
    sessionToken: string;
    placeType?: GooglePlaceType | undefined;
    searchTextRule: ((v: string) => boolean | string)[];
  }>();

  const includedPrimaryTypes = computed<string[] | undefined>(() => {
    if (!props.placeType) {
      return undefined;
    }
    return GOOGLE_PLACE_TYPE_MAP[props.placeType].autocompleteItems;
  });
  //#endregion

  //#region methods

  /**
   *  validate 關鍵字
   *  會將props.searchTextRule中的每個規則都執行
   *  如果每個規則都 return true,就 return true
   *  如果有任何一個規則 return string,就 return 那個string
   *  @param searchText 關鍵字
   *  @returns  boolean | string
   */
  const searchTextValidate = (searchText: string): boolean | string => {
    for (const rule of props.searchTextRule) {
      const result = rule(searchText);
      if (typeof result === "string") {
        return result;
      }
    }
    return true;
  };

  const autocompleteUpdateSearchText = debounce(
    async (keyword: string, sessionToken: string, primaryTypes?: string[]) => {
      if (!keyword || !sessionToken) {
        autocompleteItems.value = [];
        return;
      }

      loading.value = true;

      try {
        const response = await searchService.GetAutoComplete(keyword, sessionToken, primaryTypes);
        autocompleteItems.value =
          response.data.data?.map((item) => ({
            title: item.text,
            subtitle: item.address,
            placeId: item.placeId,
          })) || [];
      } catch {
        autocompleteItems.value = [];
      } finally {
        loading.value = false;
      }
    },
    800,
    {
      leading: false,
      trailing: true,
    },
  );

  /**
   * 關鍵字搜尋
   * @description
   *  validate 關鍵字，通過就 emit  searchByText 事件
   *  否則將錯誤訊息顯示
   */
  const searchByText = debounce(
    (keyword: string) => {
      if (searchTextValidate(keyword)) {
        emit("searchByText", keyword);
      } else {
        errorMessages.value = searchTextValidate(keyword) as string;
      }
    },
    1000,
    {
      trailing: true,
    },
  );

  /**
   * 依據地點ID搜尋
   * @description
   *  validate searchObject.value?.placeId是否存在
   *  如果存在就 emit  searchByPlaceId 事件
   *  否則輸出錯誤訊息
   */
  const searchByPlaceId = () => {
    if (!searchObject.value?.placeId) {
      //TODO: 輸出錯誤訊息
      return;
    }
    emit("searchByPlaceId", searchObject.value?.placeId);
  };

  //#endregion
</script>
