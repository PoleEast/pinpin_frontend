<template>
  <DialogController
    v-model="isShowDialog"
    :components="components"
    max-width="50%"
    max-height="80vh"></DialogController>
</template>
<script lang="ts" setup>
  import DialogController from "@/components/common/DialogController.vue";
  import LocationDetailCard from "./LocationDetailCard.vue";
  import WeatherForecastCard from "../weather/WeatherForecastCard.vue";
  import type { DialogComponent } from "@/interfaces";
  import { createPredefinedIcon } from "@/utils";
  import type {
    Coordinates,
    CurrentWeatherResponse,
    GetLocationByIdResponse,
    WeatherForecastData,
  } from "pinpin_library";
  import { reactive, ref, watch } from "vue";
  import { searchService, weatherService } from "@/services";

  const locationData = ref<GetLocationByIdResponse>();
  const currentWeatherData = ref<CurrentWeatherResponse>();
  const weatherForecastData = ref<WeatherForecastData[]>();

  const isShowDialog = defineModel<boolean>({ required: true });

  const emit = defineEmits<{
    "location-not-found": [];
    "current-weather-not-found": [];
    "weather-forecast-not-found": [];
    "weather-service-unavailable": [];
  }>();

  const props = defineProps<{
    locationId?: string;
    sessionToken: string;
  }>();

  const placeDetailProps = reactive({
    get locationData() {
      return locationData.value;
    },
    get weatherData() {
      return currentWeatherData.value;
    },
  });

  const WeatherForecastProps = reactive({
    get weatherData() {
      return currentWeatherData.value;
    },
    get weatherForecastData() {
      return weatherForecastData.value;
    },
  });

  const components: DialogComponent[] = [
    {
      component: LocationDetailCard,
      icon: createPredefinedIcon("locationDot", { size: "xs" }),
      props: placeDetailProps,
    },
    {
      component: WeatherForecastCard,
      icon: createPredefinedIcon("cloud", { size: "xs" }),
      props: WeatherForecastProps,
    },
  ];

  const fetchLocationData = async (locationId?: string) => {
    if (!locationId) return;

    console.log(locationId);

    try {
      locationData.value = undefined;
      currentWeatherData.value = undefined;
      weatherForecastData.value = undefined;

      const response = await searchService.GetLocationById(locationId, props.sessionToken);

      if (!response.data.data) {
        throw new Error("Location data not found in API response");
      }

      locationData.value = response.data.data;

      if (response.data.data.location) {
        await Promise.allSettled([
          getCurrentWeather(response.data.data.location),
          getWeatherForecast(response.data.data.location),
        ]);
      }
    } catch (error) {
      console.warn("Failed to fetch location data:", error);
      emit("location-not-found");
    }
  };

  watch(() => props.locationId, fetchLocationData, { immediate: true });

  const getCurrentWeather = async (coordinates: Coordinates) => {
    try {
      const response = await weatherService.GetCurrentWeather(coordinates);

      if (!response.data.data) {
        throw new Error("Current Weather data not found in API response");
      }

      currentWeatherData.value = response.data.data;
    } catch (error) {
      console.warn("Failed to fetch current weather:", error);

      if (error instanceof Error && error.message.includes("Network Error")) {
        emit("weather-service-unavailable");
      } else if (error instanceof Error && error.message.includes("not found")) {
        emit("current-weather-not-found");
      } else {
        emit("current-weather-not-found");
      }
    }
  };

  const getWeatherForecast = async (coordinates: Coordinates) => {
    try {
      const response = await weatherService.GetWeatherForecast(coordinates);

      if (!response.data.data?.data) {
        throw new Error("Weather Forecast data not found in API response");
      }

      weatherForecastData.value = response.data.data.data;
    } catch (error) {
      console.warn("Failed to fetch weather forecast:", error);

      if (error instanceof Error && error.message.includes("Network Error")) {
        emit("weather-service-unavailable");
      } else if (error instanceof Error && error.message.includes("not found")) {
        emit("weather-forecast-not-found");
      } else {
        emit("weather-forecast-not-found");
      }
    }
  };
</script>
