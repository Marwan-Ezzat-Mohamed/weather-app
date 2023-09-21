import { City } from "../types";
import { v4 as uuidv4 } from "uuid";
import { GeoNamesResponse, GetWeatherForecastResponse } from "./types";

const WEATHER_API_KEY = "aafa135c4bb0429399f201536231609";
const WEATHER_API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}`;
const CITIES_API_URL = "http://api.geonames.org/searchJSON";

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
  const url = `${CITIES_API_URL}?featureClass=P&featureCode=PPLA&orderby=population&maxRows=${limit}&username=marwanezzat`;
  const data = await fetchData<GeoNamesResponse>(url);
  return (data.geonames ?? []).map(
    (city) =>
      ({
        name: city.name,
        lat: Number(city.lat),
        lng: Number(city.lng),
      }) as City
  );
};

export const getCitiesByName = async (
  query: string,
  limit: number = 10
): Promise<any[]> => {
  const url = `${CITIES_API_URL}?name_startsWith=${query}&maxRows=${limit}&username=marwanezzat&orderyby=relevance`;
  const data = await fetchData<GeoNamesResponse>(url);
  return data.geonames;
};

export const getWeather = async (
  city: string | { lat: number; lng: number }
): Promise<GetWeatherForecastResponse> => {
  let query;
  if (typeof city === "string") {
    query = `${WEATHER_API_URL}&q=${city}&days=7&aqi=no&alerts=no`;
  } else {
    query = `${WEATHER_API_URL}&q=${city.lat},${city.lng}&days=7&aqi=no&alerts=no`;
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
