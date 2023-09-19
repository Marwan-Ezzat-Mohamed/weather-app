export interface GeoNamesResponse {
  totalResultsCount: number;
  geonames: Geoname[];
}

export interface Geoname {
  adminCode1: string;
  lng: string;
  geonameId: number;
  toponymName: string;
  countryId: string;
  fcl: string;
  population: number;
  countryCode: string;
  name: string;
  fclName: string;
  adminCodes1: {
    ISO3166_2: string;
  };
  countryName: string;
  fcodeName: string;
  adminName1: string;
  lat: string;
  fcode: string;
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
