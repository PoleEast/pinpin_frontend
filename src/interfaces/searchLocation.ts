interface ITextSearchOption {
  keyword: string;
  priceLevel?: string[];
  primaryType?: string;
  nextPageToken?: string;
  pageSize?: number;
  maxImageHeight?: number;
  rating?: number;
}

interface IOpeningHours {
  dayRange: {
    start: string;
    end: string;
  };
  openingTime: {
    start: string;
    end: string;
  };
}

interface IWeatherData {
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

interface ICurrentWeather extends IWeatherData {
  country: string;
  city: string;
}

interface ILocationWeather {
  country: string;
  city: string;
  weatherList: IWeatherData[];
}

export type { ITextSearchOption, IOpeningHours, IWeatherData, ILocationWeather, ICurrentWeather };
