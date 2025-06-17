<template>
  <v-autocomplete
    :items="autocompleteItems"
    menu-icon=""
    v-model:search="searchText"
    @update:search="autocompleteUpdateSearchText"
    @update:model-value="search">
    <template v-slot:append-inner>
      <font-awesome-icon icon="magnifying-glass" @click="search" class="cursor-pointer mx-1" />
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const autocompleteItems = ref<string[]>(["大阪 鐵板燒", "東京 拉麵", "京都 抹茶", "北海道 海鮮", "沖繩 美食"]);
  const searchText = ref<string>("");
  const emit = defineEmits<{
    (e: "search", value: string): void;
  }>();

  // const props = defineProps<{
  //   types: string[];
  // }>();

  const autocompleteUpdateSearchText = (value: string) => {
    searchText.value = value;
  };
  const search = () => {
    emit("search", searchText.value);
  };
</script>
