import { axiosLockManager } from "@/utils";
import type { AxiosResponse } from "axios";
import axios from "axios";
import type {
  ApiResponse,
  Coordinates,
  CurrentWeatherResponse,
  WeatherForecastResponse,
} from "pinpin_library";

export const weatherService = {
  async GetCurrentWeather(coordinates: Coordinates) {
    return await axiosLockManager.withLock(
      "GetCurrentWeather",
      async () => {
        const response: AxiosResponse<ApiResponse<CurrentWeatherResponse>> = await axios.get(
          `/weather/currentWeather`,
          {
            params: {
              lat: coordinates.lat,
              lng: coordinates.lng,
            },
          },
        );

        return response;
      },
      false,
    );
  },

  async GetWeatherForecast(coordinates: Coordinates) {
    return await axiosLockManager.withLock(
      "GetWeatherForecast",
      async () => {
        const response: AxiosResponse<ApiResponse<WeatherForecastResponse>> = await axios.get(
          `/weather/weatherForecast`,
          {
            params: {
              lat: coordinates.lat,
              lng: coordinates.lng,
            },
          },
        );

        return response;
      },
      false,
    );
  },
};
