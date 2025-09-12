<template>
  <v-card>
    <v-card-title class="text-h4 font-weight-bold bg-info">
      <font-awesome-icon icon="cloud" class="mr-2"></font-awesome-icon>
      天氣資訊
      <v-card-subtitle class="ps-0">
        晴天雨天都精彩！掌握天氣資訊，每種天氣都有專屬玩法
      </v-card-subtitle>
    </v-card-title>

    <v-card-item variant="flat">
      <div class="d-flex align-center justify-space-around">
        <!-- 城市資訊區域 -->
        <v-card-item class="text-center">
          <v-card-title class="d-flex align-center mb-1 text-h4 font-weight-bold">
            <font-awesome-icon icon="city" class="text-primary mr-2" />
            {{ weatherData.city }}
          </v-card-title>
          <v-card-subtitle>
            <font-awesome-icon icon="earth-asia" class="mr-2" />
            {{ weatherData.country }}
          </v-card-subtitle>
        </v-card-item>

        <!-- 溫度資訊區域 -->
        <v-card-item class="text-center">
          <v-card-title class="text-h2 font-weight-bold text-primary">
            {{ weatherData.data.temperature.toFixed(1) }}°C
          </v-card-title>
          <v-card-subtitle class="mb-1">
            <font-awesome-icon icon="person-walking" class="mr-1" />
            體感 {{ weatherData.data.feelsLikeTemperature }}°C
          </v-card-subtitle>

          <v-chip
            v-for="chip in weatherChips"
            :key="chip.text"
            :color="chip.color"
            class="font-weight-bold mr-2"
            variant="tonal"
            size="small">
            <font-awesome-icon :icon="chip.icon ?? ''" class="mr-1" />
            {{ chip.text }}
          </v-chip>
        </v-card-item>

        <!-- 天氣圖示區域 -->
        <v-card-item>
          <v-img
            class="weather-icon"
            :src="weatherIconBaseURL"
            max-height="200px"
            min-width="130px" />
        </v-card-item>
      </div>
    </v-card-item>
    <v-card-actions class="d-flex justify-space-between px-5 align-end">
      <v-tooltip text="塞選">
        <template #activator="{ props }">
          <v-btn v-bind="props" icon class="rounded-lg bg-primary">
            <template #default>
              <font-awesome-icon icon="filter" />
              <v-menu activator="parent" :close-on-content-click="false" location="bottom">
                <v-list
                  max-height="250px"
                  v-model:selected="selectedMetrics"
                  mandatory
                  select-strategy="single-leaf">
                  <v-list-item
                    v-for="option in WEATHER_DATA_OPTIONS"
                    class="d-flex align-center"
                    :key="option.value"
                    :value="option.value"
                    active-class="text-primary">
                    <template #prepend="{ isSelected }">
                      <FontAwesomeIcon
                        :icon="isSelected ? 'circle-dot' : ['far', 'circle']"
                        class="mr-1"></FontAwesomeIcon>
                    </template>
                    <template #title>
                      <FontAwesomeIcon
                        fixed-width
                        :icon="option.icon"
                        class="mr-1"
                        :color="option.color" />
                      <span class="text-subtitle-1">{{ option.label }}</span>
                    </template>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-btn>
        </template>
      </v-tooltip>
      <v-btn-toggle color="primary" border mandatory variant="flat" v-model="displayMode">
        <v-tooltip text="折線圖" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn value="chart" :ripple="false" v-bind="props">
              <font-awesome-icon icon="chart-line" size="lg" />
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="表格" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn value="table" :ripple="false" v-bind="props">
              <font-awesome-icon icon="table" size="lg" class="readonly" />
            </v-btn>
          </template>
        </v-tooltip>
      </v-btn-toggle>
    </v-card-actions>
    <v-card-item>
      <WeatherForecastChart
        v-if="displayMode === 'chart'"
        :weather-data="weatherForecastData"
        :selected-metrics="selectedMetrics" />
    </v-card-item>
  </v-card>
</template>
<script lang="ts" setup>
  import WeatherForecastChart from "@/components/feature/weather/WeatherForecastChart.vue";
  import weatherForecastDataJSON from "@/assets/testData/weatherForecastData.json";
  import currentWeatherDataJSON from "@/assets/testData/currentWeatherData.json";
  import type { CurrentWeatherResponse, WeatherForecastData } from "pinpin_library";
  import { computed, shallowRef } from "vue";
  import type { Chip } from "@/interfaces";
  import { OPEN_WEATHER_URL } from "@/constants/index";
  import { WEATHER_DATA_OPTIONS, type WeatherChartOption } from "@/constants/Weather.constants";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

  const weatherData = currentWeatherDataJSON.data as CurrentWeatherResponse;
  const weatherForecastData = weatherForecastDataJSON.data.data as WeatherForecastData[];
  const selectedMetrics = shallowRef<WeatherChartOption>("temperature");
  const displayMode = shallowRef<"chart" | "table">("chart");

  const weatherIconBaseURL = computed<string>(() => {
    return OPEN_WEATHER_URL.ICON.BASE + weatherData.data.icon + OPEN_WEATHER_URL.ICON.SUFFIX;
  });

  const weatherChips = computed<Chip[]>(() => {
    const hasSnow = Boolean(weatherData.data.snow);
    const hasRain = Boolean(weatherData.data.rain);

    const cloudSnowChip = {
      icon: hasSnow ? "snowman" : "cloud",
      text: hasSnow ? `${weatherData.data.snow}mm` : `${weatherData.data.cloud}%`,
      color: "silver",
    };
    const windRainChip = {
      icon: hasRain ? "cloud-rain" : "wind",
      text: hasRain ? `${weatherData.data.rain}mm` : `${weatherData.data.windSpeed}m`,
      color: "blue",
    };

    return [windRainChip, cloudSnowChip];
  });
</script>
