<template>
  <v-card class="border rounded-lg pa-0" hover>
    <v-img :src="location.photoURL" :height="imageMaxHeight + 'px'" cover>
      <v-btn
        class="ma-2 rounded-1 aspect-ratio-"
        variant="outlined"
        color="pink-lighten-3"
        size="small">
        <font-awesome-icon class="pa-0 ma-0" icon="heart" />
      </v-btn>
    </v-img>
    <v-card-title class="mx-1 pb-0">{{ location.placeName }}</v-card-title>
    <v-card-subtitle class="mx-1">
      <v-row class="d-flex align-center justify-space-between pa-0">
        <v-col cols="auto pb-0">
          <span class="text-subtitle-2">評分:</span>
          <v-rating
            :model-value="location.rating"
            active-color="warning"
            hover
            readonly
            size="17"
            :full-icon="createStarIcon('filled', '2xs')"
            :empty-icon="createStarIcon('empty', '2xs')">
            icon
          </v-rating>
          <span class="text-subtitle-2">({{ location.userRatingCount }})</span>
        </v-col>
        <v-col cols="auto pb-0" class="d-flex align-center">
          <span class="text-subtitle-2 mr-3 font-weight-bold">
            {{ BUSSINESS_PRICE_MAP[location.price].label }}
          </span>
          <v-img :src="location.IconURL" width="1em" height="1em" />
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-space-between pa-0">
        <v-col cols="auto" class="py-0">
          <span class="text-subtitle-2">{{ location.phone }}</span>
        </v-col>
        <v-col cols="auto" class="py-0">
          <span
            class="text-subtitle-2 text-success"
            :color="BUSINESS_STATUS_MAP[location.businssStuts].color">
            {{ BUSINESS_STATUS_MAP[location.businssStuts].label }}
          </span>
        </v-col>
      </v-row>
      <v-row class="pb-1">
        <v-col cols="auto" class="pt-0">
          <span class="text-subtitle-2 text-info d-block text-truncate">
            {{ location.address }}
          </span>
        </v-col>
      </v-row>
    </v-card-subtitle>
  </v-card>
</template>

<script lang="ts" setup>
  import { createStarIcon } from "@/utils";
  import { BUSINESS_STATUS_MAP } from "@/constants/index";
  import type { ILocationCard } from "@/interfaces";
  import { BUSSINESS_PRICE_MAP } from "@/constants/BusinessPrice.constant";

  defineProps<{
    location: ILocationCard;
    imageMaxHeight: number;
  }>();
</script>
