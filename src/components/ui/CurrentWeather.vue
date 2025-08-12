<template>
  <v-card class="pa-4" elevation="3" rounded="lg">
    <!-- 頭部資訊 -->
    <v-card-title class="d-flex justify-space-between align-center mb-6">
      <div>
        <v-card-title class="text-h4 font-weight-bold">
          <font-awesome-icon icon="city" class="opacity-80" />
          {{ currentWeather.city }}
        </v-card-title>
        <v-card-subtitle>
          <font-awesome-icon icon="earth-asia" class="opacity-80" />
          {{ currentWeather.country }}
        </v-card-subtitle>
      </div>
      <div>
        <v-card-subtitle class="text-right">
          {{ new Date(currentWeather.unixTimestamp * 1000).toLocaleTimeString() }}
        </v-card-subtitle>
        <v-card-subtitle class="text-primary text-right text-subtitle-2 opacity-90">
          {{ currentWeather.weather }}
        </v-card-subtitle>
      </div>
    </v-card-title>

    <!-- 主要溫度顯示 -->
    <v-card-text class="d-flex align-center justify-center">
      <div class="text-center mr-8">
        <div class="text-h1 font-weight-light mb-2">{{ currentWeather.temperature }}°</div>
        <div class="text-body-1 text-medium-emphasis">
          <font-awesome-icon icon="person-walking" class="mr-1" />
          體感 {{ currentWeather.feelsLikeTemperature }}°C
        </div>
      </div>
      <v-img :src="weatherIconURL" class="weather-icon" max-height="120px" max-width="120px" />
    </v-card-text>

    <!-- 溫度範圍 -->
    <v-card-text class="d-flex justify-center">
      <v-chip color="error" variant="outlined" class="mr-5">
        <font-awesome-icon icon="temperature-arrow-up" class="mr-1" />
        {{ currentWeather.maxTemperature }}°C
      </v-chip>
      <v-chip color="blue" variant="outlined">
        <font-awesome-icon icon="temperature-arrow-down" class="mr-1" />
        {{ currentWeather.minTemperature }}°C
      </v-chip>
    </v-card-text>

    <!-- 詳細資訊網格 -->
    <v-divider class="mb-4"></v-divider>
    <v-row dense>
      <v-col cols="6" sm="3">
        <v-card-item class="weather-detail text-center rounded-lg pa-0">
          <font-awesome-icon icon="cloud-rain" />
          <div class="text-caption text-medium-emphasis">降雨機率</div>
          <div class="text-body-1 font-weight-medium text-primary">{{ currentWeather.PoP }}%</div>
        </v-card-item>
      </v-col>
      <v-col cols="6" sm="3">
        <v-card-item class="weather-detail text-center rounded-lg pa-0">
          <font-awesome-icon icon="cloud" />
          <div class="text-caption text-medium-emphasis">雲量</div>
          <div class="text-body-1 font-weight-medium text-primary">{{ currentWeather.cloud }}%</div>
        </v-card-item>
      </v-col>
      <v-col cols="6" sm="3">
        <v-card-item class="weather-detail text-center rounded-lg pa-0">
          <font-awesome-icon icon="wind" />
          <div class="text-caption text-medium-emphasis">風速</div>
          <div class="text-body-1 font-weight-medium text-primary">
            {{ currentWeather.windSpeed }} m/s
          </div>
        </v-card-item>
      </v-col>
      <v-col cols="6" sm="3">
        <v-card-item class="weather-detail text-center rounded-lg pa-0">
          <font-awesome-icon icon="droplet" />
          <div class="text-caption text-medium-emphasis">濕度</div>
          <div class="text-body-1 font-weight-medium text-primary">
            {{ currentWeather.humidity }}%
          </div>
        </v-card-item>
      </v-col>
    </v-row>
  </v-card>
</template>
<script setup lang="ts">
  import type { ICurrentWeather } from "@/interfaces";
  import { computed, ref } from "vue";

  const weatherIconBaseURL = {
    base: "https://openweathermap.org/img/wn/",
    size: "@4x.png",
  };

  const currentWeather = ref<ICurrentWeather>({
    unixTimestamp: Math.floor(Date.now() / 1000),
    temperature: 28,
    maxTemperature: 32,
    minTemperature: 24,
    feelsLikeTemperature: 30,
    humidity: 65,
    visibility: 10,
    weather: "多雲",
    cloud: 40,
    windSpeed: 8.5,
    PoP: 20,
    country: "Taiwan",
    city: "Taipei",
    icon: "04d",
  });

  const weatherIconURL = computed(() => {
    return `${weatherIconBaseURL.base}${currentWeather.value.icon}${weatherIconBaseURL.size}`;
  });
</script>

<style scoped>
  .weather-icon {
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  }

  .weather-detail:hover {
    transform: translateY(-2px);
  }
</style>
