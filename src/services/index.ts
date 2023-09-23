import { City } from "../types";
import { v4 as uuidv4 } from "uuid";
import {
  GetTopPopulatedCitiesResponse,
  GetWeatherForecastResponse,
  ServerCity,
} from "./types";

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const AUTO_COMPLETE_API_URL = `https://api.weatherapi.com/v1/search.json?key=${WEATHER_API_KEY}`;
const WEATHER_API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}`;

const CITIES_POPULATION_API_URL = `https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000@public/records?order_by=population%20DESC`;

/**
 * Make a generic fetch function
 * @param url The URL to fetch data from
 * @returns The JSON response
 */
const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching data from ${url}`);
  }
  return response.json();
};

export const getTopPopulatedCities = async (
  limit: number = 15
): Promise<City[]> => {
  const url = `${CITIES_POPULATION_API_URL}&limit=${limit}`;
  const data = await fetchData<GetTopPopulatedCitiesResponse>(url);
  return (data.results ?? []).map(
    (city) =>
      ({
        name: city.name + ", " + city.cou_name_en,
        lat: city.coordinates.lat,
        lng: city.coordinates.lon,
      }) as City
  );
};

export const getCitiesByName = async (
  query: string,
  limit: number = 10
): Promise<City[]> => {
  const url = `${AUTO_COMPLETE_API_URL}&q=${query}`;
  const data = await fetchData<ServerCity[]>(url);
  return data.map(
    (city) =>
      ({
        id: city.id.toString(),
        name: city.name + ", " + city.region + ", " + city.country,
        lat: Number(city.lat),
        lng: Number(city.lon),
      }) as City
  );
};

export const getWeather = async (
  city: string | { lat: number; lng: number }
): Promise<GetWeatherForecastResponse> => {
  let query;
  if (typeof city === "string") {
    query = `${WEATHER_API_URL}&q=${city}&days=3&aqi=no&alerts=no`;
  } else {
    query = `${WEATHER_API_URL}&q=${city.lat},${city.lng}&days=3&aqi=no&alerts=no`;
  }

  const data = await fetchData<GetWeatherForecastResponse>(query);
  data.id =
    typeof city === "string"
      ? uuidv4()
      : `${city.lat},${city.lng} ${data.location.name}`;
  return data;
};

export const getBulkWeather = async (
  cities: City[]
): Promise<GetWeatherForecastResponse[]> => {
  const promises = cities.map((city) =>
    getWeather({ lat: city.lat, lng: city.lng })
  );
  return Promise.all(promises);
};
