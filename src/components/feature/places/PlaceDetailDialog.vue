<template>
  <DialogController
    :components="components"
    persistent
    max-width="50%"
    max-height="80vh"
    :model-value="isShowDialog"></DialogController>
</template>
<script lang="ts" setup>
  import DialogController from "@/components/common/DialogController.vue";
  import PlaceDetailCard from "./PlaceDetailCard.vue";
  import WeatherForecastCard from "../weather/WeatherForecastCard.vue";
  import type { DialogComponent } from "@/interfaces";
  import { createPredefinedIcon } from "@/utils";
  const isShowDialog = defineModel<boolean>({ required: true });
  const components: DialogComponent[] = [
    {
      component: PlaceDetailCard,
      icon: createPredefinedIcon("locationDot", { size: "xs" }),
    },
    {
      component: WeatherForecastCard,
      icon: createPredefinedIcon("cloud", { size: "xs" }),
    },
  ];
</script>
