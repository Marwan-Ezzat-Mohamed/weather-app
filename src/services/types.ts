export interface GetTopPopulatedCitiesResponse {
  total_count: number;
  results: ResultCity[];
}

interface ResultCity {
  geoname_id: string;
  name: string;
  ascii_name: string;
  alternate_names: string[];
  feature_class: string;
  feature_code: string;
  country_code: string;
  cou_name_en: string;
  country_code_2?: any;
  admin1_code: string;
  admin2_code?: string;
  admin3_code?: any;
  admin4_code?: any;
  population: number;
  elevation?: any;
  dem: number;
  timezone: string;
  modification_date: string;
  label_en: string;
  coordinates: Coordinates;
}

interface Coordinates {
  lon: number;
  lat: number;
}

export interface ServerCity {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export interface GetWeatherForecastResponse {
  location: Location;
  current: CurrentWeather;
  forecast: Forecast;
  id: string;
}

interface Forecast {
  forecastday: ForecastDay[];
}

interface ForecastDay {
  day: Day;
  astro: {};
  hour: WeatherHour[];
}

export interface WeatherHour {
  time: string;
  temp_c: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  humidity: number;
  feelslike_c: number;
  uv: number;
}

interface Day {
  maxtemp_c: number;
  mintemp_c: number;
  maxwind_kph: number;
  condition: Condition;
  uv: number;
}

interface CurrentWeather {
  temp_c: number;

  is_day: number;
  condition: Condition;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  humidity: number;
  feelslike_c: number;
  uv: number;
}

interface Condition {
  text: string;
}

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}
