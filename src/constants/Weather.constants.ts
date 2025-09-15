import type { WeatherForecastData } from "@/interfaces";
import { objectToOptions } from "@/utils";
import type { PeriodOfTime } from "pinpin_library";

type WeatherChartOption = keyof Omit<WeatherForecastData, "unixTimestamp" | "weather" | "icon">;

const CHART_GRADIENT_COLORS: Record<WeatherChartOption, Record<PeriodOfTime, string[]>> = {
  temperature: {
    Day: ["rgba(255, 87, 34, 0.4)", "rgba(255, 152, 0, 0.2)", "rgba(255, 87, 34, 0.05)"],
    Night: ["rgba(156, 39, 176, 0.4)", "rgba(103, 58, 183, 0.2)", "rgba(156, 39, 176, 0.05)"],
  },
  maxTemperature: {
    Day: ["rgba(211, 47, 47, 0.4)", "rgba(244, 67, 54, 0.2)", "rgba(211, 47, 47, 0.05)"],
    Night: ["rgba(136, 14, 79, 0.4)", "rgba(173, 20, 87, 0.2)", "rgba(136, 14, 79, 0.05)"],
  },
  minTemperature: {
    Day: ["rgba(25, 118, 210, 0.4)", "rgba(33, 150, 243, 0.2)", "rgba(25, 118, 210, 0.05)"],
    Night: ["rgba(13, 71, 161, 0.4)", "rgba(21, 101, 192, 0.2)", "rgba(13, 71, 161, 0.05)"],
  },
  feelsLikeTemperature: {
    Day: ["rgba(255, 152, 0, 0.4)", "rgba(255, 193, 7, 0.2)", "rgba(255, 152, 0, 0.05)"],
    Night: ["rgba(230, 81, 0, 0.4)", "rgba(245, 124, 0, 0.2)", "rgba(230, 81, 0, 0.05)"],
  },
  humidity: {
    Day: ["rgba(33, 150, 243, 0.4)", "rgba(3, 169, 244, 0.2)", "rgba(33, 150, 243, 0.05)"],
    Night: ["rgba(13, 71, 161, 0.4)", "rgba(25, 118, 210, 0.2)", "rgba(13, 71, 161, 0.05)"],
  },
  visibility: {
    Day: ["rgba(96, 125, 139, 0.4)", "rgba(120, 144, 156, 0.2)", "rgba(96, 125, 139, 0.05)"],
    Night: ["rgba(55, 71, 79, 0.4)", "rgba(69, 90, 100, 0.2)", "rgba(55, 71, 79, 0.05)"],
  },
  cloud: {
    Day: ["rgba(158, 158, 158, 0.4)", "rgba(189, 189, 189, 0.2)", "rgba(158, 158, 158, 0.05)"],
    Night: ["rgba(97, 97, 97, 0.4)", "rgba(117, 117, 117, 0.2)", "rgba(97, 97, 97, 0.05)"],
  },
  windSpeed: {
    Day: ["rgba(0, 188, 212, 0.4)", "rgba(0, 172, 193, 0.2)", "rgba(0, 188, 212, 0.05)"],
    Night: ["rgba(0, 96, 100, 0.4)", "rgba(0, 131, 143, 0.2)", "rgba(0, 96, 100, 0.05)"],
  },
  PoP: {
    Day: ["rgba(63, 81, 181, 0.4)", "rgba(92, 107, 192, 0.2)", "rgba(63, 81, 181, 0.05)"],
    Night: ["rgba(40, 53, 147, 0.4)", "rgba(57, 73, 171, 0.2)", "rgba(40, 53, 147, 0.05)"],
  },
  rain: {
    Day: ["rgba(33, 150, 243, 0.4)", "rgba(100, 181, 246, 0.2)", "rgba(33, 150, 243, 0.05)"],
    Night: ["rgba(21, 101, 192, 0.4)", "rgba(25, 118, 210, 0.2)", "rgba(21, 101, 192, 0.05)"],
  },
  snow: {
    Day: ["rgba(224, 224, 224, 0.4)", "rgba(245, 245, 245, 0.2)", "rgba(224, 224, 224, 0.05)"],
    Night: ["rgba(189, 189, 189, 0.4)", "rgba(224, 224, 224, 0.2)", "rgba(189, 189, 189, 0.05)"],
  },
} as const;

const WEATHER_DATA_MAP: Record<
  WeatherChartOption,
  { label: string; color: string; unit: string; icon: string }
> = Object.freeze({
  temperature: Object.freeze({
    label: "溫度",
    color: "#FF5722",
    unit: "°C",
    icon: "temperature-empty",
  }),
  maxTemperature: Object.freeze({
    label: "最高溫",
    unit: "°C",
    color: "#D32F2F",
    icon: "temperature-arrow-up",
  }),
  minTemperature: Object.freeze({
    label: "最低溫",
    color: "#1976D2",
    unit: "°C",
    icon: "temperature-arrow-down",
  }),
  feelsLikeTemperature: Object.freeze({
    label: "體感溫度",
    unit: "°C",
    color: "#FF9800",
    icon: "person-walking",
  }),
  humidity: Object.freeze({ label: "濕度", color: "#2196F3", unit: "%", icon: "droplet" }),
  visibility: Object.freeze({ label: "能見度", color: "#607D8B", unit: "m", icon: "eye" }),
  cloud: Object.freeze({ label: "雲量", color: "#9E9E9E", unit: "%", icon: "cloud" }),
  windSpeed: Object.freeze({ label: "風速", color: "#00BCD4", unit: "m/s", icon: "wind" }),
  PoP: Object.freeze({ label: "降雨機率", color: "#3F51B5", unit: "%", icon: "cloud-rain" }),
  rain: Object.freeze({ label: "降雨量", color: "#2196F3", unit: "mm", icon: "ruler-vertical" }),
  snow: Object.freeze({ label: "降雪量", color: "#E0E0E0", unit: "mm", icon: "snowflake" }),
});

const WEATHER_DATA_OPTIONS = objectToOptions(WEATHER_DATA_MAP);

export { WEATHER_DATA_MAP, WEATHER_DATA_OPTIONS, CHART_GRADIENT_COLORS };
export type { WeatherChartOption };
