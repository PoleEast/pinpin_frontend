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

interface CurrentWeather extends WeatherData {
  country: string;
  city: string;
}

interface WeatherForecast {
  country: string;
  city: string;
  weatherList: WeatherData[];
}

export type { CurrentWeather, WeatherForecast, WeatherData };
