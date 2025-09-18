<template>
  <v-skeleton-loader v-if="isLoading" type="card"></v-skeleton-loader>
  <v-card v-else class="pa-4" flat>
    <!-- 頭部資訊 -->
    <!-- TODO: 城市或國家名稱過長時會擠壓右側時間和天氣顯示，需要改進佈局 -->
    <v-card-title class="d-flex justify-space-between align-center mb-6">
      <div>
        <v-card-title
          class="font-weight-bold overflow-hidden"
          :class="isCityTextTooLong ? 'text-subtitle-2' : 'text-h4'">
          <font-awesome-icon icon="city" class="opacity-80" />
          {{ currentWeather?.city }}
        </v-card-title>
        <v-card-subtitle>
          <font-awesome-icon icon="earth-asia" class="opacity-80" />
          {{ currentWeather?.country }}
        </v-card-subtitle>
      </div>
      <div>
        <v-card-subtitle class="text-right">
          {{ new Date((currentWeather?.data?.unixTimestamp ?? 0) * 1000).toLocaleTimeString() }}
        </v-card-subtitle>
        <v-card-subtitle class="text-primary text-right text-subtitle-2 opacity-90">
          {{ currentWeather?.data.weather }}
        </v-card-subtitle>
      </div>
    </v-card-title>

    <!-- 主要溫度顯示 -->
    <v-card-text class="d-flex align-center justify-center">
      <div class="text-center">
        <div class="text-h1 font-weight-light mb-2">{{ currentWeather?.data.temperature }}°</div>
        <div class="text-body-1 text-medium-emphasis">
          <font-awesome-icon icon="person-walking" class="mr-1" />
          體感 {{ currentWeather?.data.feelsLikeTemperature }}°C
        </div>
      </div>
      <v-img :src="weatherIconURL" class="weather-icon" max-height="120px" max-width="120px" />
    </v-card-text>

    <!-- 溫度範圍 -->
    <v-card-text class="d-flex justify-center">
      <v-chip color="error" variant="outlined" class="mr-5">
        <font-awesome-icon icon="temperature-arrow-up" class="mr-1" />
        {{ currentWeather?.data.maxTemperature }}°C
      </v-chip>
      <v-chip color="blue" variant="outlined">
        <font-awesome-icon icon="temperature-arrow-down" class="mr-1" />
        {{ currentWeather?.data.minTemperature }}°C
      </v-chip>
    </v-card-text>

    <!-- 詳細資訊網格 -->
    <v-divider class="mb-4"></v-divider>
    <v-row dense>
      <v-col cols="6" sm="3">
        <v-card-item class="weather-detail text-center rounded-lg pa-0">
          <font-awesome-icon icon="cloud-rain" />
          <div class="text-caption text-medium-emphasis">降雨機率</div>
          <div class="text-body-1 font-weight-medium text-primary">
            {{ currentWeather?.data.rain ?? 0 }}%
          </div>
        </v-card-item>
      </v-col>
      <v-col cols="6" sm="3">
        <v-card-item class="weather-detail text-center rounded-lg pa-0">
          <font-awesome-icon icon="cloud" />
          <div class="text-caption text-medium-emphasis">雲量</div>
          <div class="text-body-1 font-weight-medium text-primary">
            {{ currentWeather?.data.cloud }}%
          </div>
        </v-card-item>
      </v-col>
      <v-col cols="6" sm="3">
        <v-card-item class="weather-detail text-center rounded-lg pa-0">
          <font-awesome-icon icon="wind" />
          <div class="text-caption text-medium-emphasis">風速</div>
          <div class="text-body-1 font-weight-medium text-primary">
            {{ currentWeather?.data.windSpeed }} m/s
          </div>
        </v-card-item>
      </v-col>
      <v-col cols="6" sm="3">
        <v-card-item class="weather-detail text-center rounded-lg pa-0">
          <font-awesome-icon icon="droplet" />
          <div class="text-caption text-medium-emphasis">濕度</div>
          <div class="text-body-1 font-weight-medium text-primary">
            {{ currentWeather?.data.humidity }}%
          </div>
        </v-card-item>
      </v-col>
    </v-row>
  </v-card>
</template>
<script setup lang="ts">
  //TODO: 需要處理降雨、降雪、雲量的顯示，因為不一定會有這些資料

  import type { CurrentWeatherResponse } from "pinpin_library";
  import { computed } from "vue";

  const props = defineProps<{
    currentWeather?: CurrentWeatherResponse;
  }>();

  const weatherIconBaseURL = {
    base: "https://openweathermap.org/img/wn/",
    size: "@4x.png",
  };

  const isLoading = computed(() => {
    return !props.currentWeather;
  });
  const weatherIconURL = computed(() => {
    return `${weatherIconBaseURL.base}${props.currentWeather?.data.icon}${weatherIconBaseURL.size}`;
  });

  const isCityTextTooLong = computed(() => {
    if (!props.currentWeather) return;

    return props.currentWeather?.city.length > 15;
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
