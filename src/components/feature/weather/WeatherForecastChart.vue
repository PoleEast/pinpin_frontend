<template>
  <div class="d-flex justify-center align-center">
    <Line :data="chartData" :options="chartOption" class="w-100"></Line>
  </div>
</template>
<script setup lang="ts">
  import chart, {
    Chart,
    type ChartData,
    type ChartDataset,
    type ChartOptions,
    type DefaultDataPoint,
  } from "chart.js/auto";
  import { Line } from "vue-chartjs";
  import type { WeatherForecastData, PeriodOfTime } from "pinpin_library";
  import { computed, watch, ref, onUnmounted } from "vue";
  import { groupBy, calculateAverage, type NumberKeys } from "@/utils/index";
  import { CHART_GRADIENT_COLORS, WEATHER_DATA_MAP, type WeatherChartOption } from "@/constants";

  const props = defineProps<{
    weatherData: WeatherForecastData[];
    selectedMetrics: WeatherChartOption;
  }>();

  const gradientCacheMap: Map<string, CanvasGradient> = new Map();

  chart.register();

  const createWeatherEntry = (
    data: WeatherForecastData[],
    periodOfTime: PeriodOfTime,
  ): Partial<WeatherForecastData> => ({
    temperature: calculateAverage(data, "temperature"),
    maxTemperature: calculateAverage(data, "maxTemperature"),
    minTemperature: calculateAverage(data, "minTemperature"),
    feelsLikeTemperature: calculateAverage(data, "feelsLikeTemperature"),
    humidity: calculateAverage(data, "humidity"),
    visibility: calculateAverage(data, "visibility"),
    cloud: calculateAverage(data, "cloud"),
    windSpeed: calculateAverage(data, "windSpeed"),
    PoP: calculateAverage(data, "PoP"),
    rain: calculateAverage(
      data.map((d) => ({ ...d, rain: d.rain ?? 0 })),
      "rain",
    ),
    snow: calculateAverage(
      data.map((d) => ({ ...d, snow: d.snow ?? 0 })),
      "snow",
    ),
    periodOfTime,
  });

  const createDayNightEntries = (data: WeatherForecastData[]): Partial<WeatherForecastData>[] => [
    createWeatherEntry(
      data.filter((d) => d.periodOfTime === "Day"),
      "Day",
    ),
    createWeatherEntry(
      data.filter((d) => d.periodOfTime === "Night"),
      "Night",
    ),
  ];

  const weatherForecastChart = computed(() => {
    const processedData = groupBy(props.weatherData, "unixTimestamp", (unixTime) =>
      new Date(unixTime * 1000).toLocaleDateString("zh-TW", { month: "numeric", day: "numeric" }),
    );

    return Object.entries(processedData).map(([label, data]) => {
      return {
        label: label,
        WeatherForecastData: createDayNightEntries(data),
      };
    });
  });

  const createGradient = (
    ctx: CanvasRenderingContext2D,
    chartArea: Chart["chartArea"],
    key: keyof typeof CHART_GRADIENT_COLORS,
    DayOrNight: keyof (typeof CHART_GRADIENT_COLORS)[keyof typeof CHART_GRADIENT_COLORS],
  ) => {
    const cached = gradientCacheMap.get(key);
    if (cached) return cached;

    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    const colors = CHART_GRADIENT_COLORS[key][DayOrNight];

    colors.forEach((color, index) => {
      const stop = index / (colors.length - 1);
      gradient.addColorStop(stop, color);
    });

    gradientCacheMap.set(key, gradient);

    return gradient;
  };

  const createChartDataSetData = (
    periodOfTime: PeriodOfTime,
    key: NumberKeys<WeatherForecastData>,
  ) => {
    return weatherForecastChart.value
      .flatMap((data) => data.WeatherForecastData)
      .filter((data) => data.periodOfTime === periodOfTime)
      .map((data) => data[key] ?? 0);
  };

  const createChartDataSets = (): ChartDataset<"line", DefaultDataPoint<"line">>[] => [
    {
      label: "☀️ 白天" + WEATHER_DATA_MAP[props.selectedMetrics].label,
      data: createChartDataSetData("Day", props.selectedMetrics),
      borderColor: "#FF6B35",
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return "rgba(255, 107, 53, 0.15)";
        return createGradient(ctx, chartArea, props.selectedMetrics, "Day");
      },
      borderWidth: 3,
      pointBackgroundColor: "#FF6B35",
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
      fill: true,
      tension: 0.4,
      stack: "Day",
    },
    {
      label: "🌙 夜晚" + WEATHER_DATA_MAP[props.selectedMetrics].label,
      data: createChartDataSetData("Night", props.selectedMetrics),
      borderColor: "#4A90E2",
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return "rgba(74, 144, 226, 0.15)";
        return createGradient(ctx, chartArea, props.selectedMetrics, "Night");
      },
      animation: {
        delay: 500,
      },
      borderWidth: 3,
      borderDash: [8, 4],
      pointBackgroundColor: "#4A90E2",
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointStyle: "rectRounded",
      fill: true,
      tension: 0.4,
      stack: "Night",
    },
  ];

  const chartDataSet = ref<ChartDataset<"line", DefaultDataPoint<"line">>[]>(createChartDataSets());

  const chartData = computed((): ChartData<"line"> => {
    return {
      labels: weatherForecastChart.value.map((data) => data.label),
      datasets: chartDataSet.value,
    };
  });

  watch(
    () => props.selectedMetrics,
    () => {
      chartDataSet.value = createChartDataSets();
    },
  );

  onUnmounted(() => {
    gradientCacheMap.clear();
  });

  const chartOption: ChartOptions<"line"> = {
    animation: {
      duration: 1000,
      easing: "easeOutBounce",
    },
    interaction: {
      intersect: false,
    },
    plugins: {
      tooltip: {
        callbacks: {
          afterLabel: (context) => {
            const result: string[] = [];
            const stack = context.dataset.stack;
            const date = context.label;
            const data = weatherForecastChart.value
              .find((data) => data.label === date)
              ?.WeatherForecastData.find((d) => d.periodOfTime === stack);

            if (data) {
              Object.entries(data).forEach(([key, val]) => {
                if (
                  key !== "periodOfTime" &&
                  val !== undefined &&
                  key !== props.selectedMetrics &&
                  typeof val !== "string"
                ) {
                  const entryLabel = WEATHER_DATA_MAP[key as WeatherChartOption]?.label;
                  if (entryLabel) {
                    result.push(`${entryLabel}: ${val.toFixed(2)}`);
                  }
                }
              });
            }

            return result;
          },
        },
      },
      legend: {
        labels: {
          usePointStyle: true,
        },
        onClick: () => {},
      },
    },
  };
</script>
