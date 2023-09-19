import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { GetWeatherForecastResponse } from "../services/types";
import { City } from "../types";

export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (localtime: string) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(localtime));
};

export const mapServerResponseToWeatherToProps = (
  weather: GetWeatherForecastResponse | undefined,
  favoriteCities: City[],
  handleFavoriteClick = () => {}
) => {
  if (!weather) return undefined;
  const {
    id,
    location: { name, country, lat, lon },
    current,
    forecast: { forecastday },
  } = weather;

  const isFavorite = favoriteCities.some((city) => city.id === id);

  // Map the weather data to props for WeatherDetailsCard
  const weatherCardProps = {
    city: {
      id,
      name: `${name}, ${country}`,
      lat,
      lng: lon,
    },
    weatherConditionText: current.condition.text,
    isDay: !!current.is_day,
    temp: current.temp_c,
    localTime: weather.location.localtime,
    humidity: current.humidity,
    wind: current.wind_kph,
    feelsLike: current.feelslike_c,
    maxTemp: forecastday[0].day.maxtemp_c,
    minTemp: forecastday[0].day.mintemp_c,
    pressure: current.pressure_mb,
    description: current.condition.text,
    onFavoriteClick: handleFavoriteClick,
    isFavorite,
    weatherHour: forecastday.map((day) => day.hour).flat(1),
  };

  return weatherCardProps;
};
