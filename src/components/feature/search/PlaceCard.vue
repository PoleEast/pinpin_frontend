<template>
  <v-card class="pa-1 border rounded-lg" hover>
    <v-img src="" height="200px"
      ><v-btn class="ma-2 rounded-1 aspect-ratio-" variant="outlined" color="pink-lighten-3" size="small"
        ><font-awesome-icon class="pa-0 ma-0" icon="heart" /></v-btn
    ></v-img>
    <v-card-title class="mx-1">{{ placeName }}</v-card-title>
    <v-card-subtitle class="mx-1">
      <v-row class="d-flex align-center justify-space-between pa-0">
        <v-col cols="auto pb-0">
          <span class="text-subtitle-2">評分: </span>
          <v-rating
            :model-value="rating"
            active-color="warning"
            hover
            readonly
            size="17"
            :full-icon="createStarIcon('filled', '2xs')"
            :empty-icon="createStarIcon('empty', '2xs')">
            icon
          </v-rating>
          <span class="text-subtitle-2">(200) </span>
        </v-col>
        <v-col cols="auto pb-0">
          <span class="text-subtitle-2"> {{ price }} </span>
          <span class="text-subtitle-2"> {{ primaryType }} </span>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-space-between pa-0">
        <v-col cols="auto" class="py-0">
          <span class="text-subtitle-2">{{ phone }}</span>
        </v-col>
        <v-col cols="auto" class="py-0">
          <span class="text-subtitle-2 text-success">{{ BUSINESS_STATUS_MAP[businssStuts] }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto" class="py-0 pb-1">
          <span class="text-subtitle-2 text-info">{{ address }}</span>
        </v-col>
      </v-row>
    </v-card-subtitle>
  </v-card>
</template>

<script lang="ts" setup>
  import { createStarIcon } from "@/utils";
  import { BUSINESS_STATUS_MAP, type BusinessStatus } from "@/constants/index";

  defineProps<{
    placeName: string;
    rating: number;
    price: "$" | "$$" | "$$$" | "$$$$";
    primaryType: string;
    address: string;
    businssStuts: BusinessStatus;
    phone: string;
  }>();
</script>
