interface WeatherData {
  unixTimestamp: number;
  temperature: number;
  maxTemperature: number;
  minTemperature: number;
  feelsLikeTemperature: number;
  humidity: number;
  visibility: number;
  weather: string;
  cloud: number;
  windSpeed: number;
  PoP: number;
  icon: string;
}

interface WeatherForecastData extends WeatherData {
  rain?: number;
  snow?: number;
}

interface CurrentWeather extends WeatherData {
  country: string;
  city: string;
}

interface WeatherForecast {
  country: string;
  city: string;
  weatherList: WeatherData[];
}

export type { CurrentWeather, WeatherForecast, WeatherData, WeatherForecastData };
