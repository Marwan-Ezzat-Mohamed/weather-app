import { City } from "../types";
import http from "./httpService";
import { v4 as uuidv4 } from "uuid";
import { GeoNamesResponse, GetWeatherForecastResponse } from "./types";
//https://api.weatherapi.com/v1/forecast.json?key=aafa135c4bb0429399f201536231609&q=London&days=1&aqi=no&alerts=no

// 20571ab45c74dc2a1897b60c5b8047a1
//8b384e01b15565257c6d38cf34542452
const WEATHER_API_KEY = "aafa135c4bb0429399f201536231609";
const WEATHER_API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}`;
const CITIES_API_URL = "http://api.geonames.org/searchJSON";

/**
 * Get top populated cities
 * @param limit number of results
 * @returns top populated cities
 * @example getTopPopulatedCities() // get top 15 populated cities
 * @example getTopPopulatedCities(5) // get top 5 populated cities
 */
export const getTopPopulatedCities = async (limit: number = 15) => {
  const { data } = await http.get<GeoNamesResponse>(
    `${CITIES_API_URL}?featureClass=P&featureCode=PPLA&orderby=population&maxRows=${limit}&username=marwanezzat`
  );
  return (data.geonames ?? [])
    .map(
      (city) =>
        ({
          name: city.name,
          lat: Number(city.lat),
          lng: Number(city.lng),
        }) as City
    )
    .sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * Get cities by name
 * @param query city name
 * @param limit number of results
 * @returns cities matching the query
 * @example getCitiesByName("New York") // get cities matching "New York"
 * @example getCitiesByName("New York", 5) // get 5 cities matching "New York"
 */
export const getCitiesByName = async (query: string, limit: number = 10) => {
  const { data } = await http.get<GeoNamesResponse>(
    `${CITIES_API_URL}?name_startsWith=${query}&maxRows=${limit}&username=marwanezzat&orderyby=relevance`
  );
  return data.geonames;
};

/**
 * Get weather data for a city
 * @param query city name or lat,lng
 * @returns weather data for the city
 * @example getWeather("New York") // get weather data for New York
 * @example getWeather("40.714,-74.006") // get weather data for New York
 */
export const getWeather = async (
  city: string | { lat: number; lng: number }
) => {
  if (typeof city === "string") {
    const { data } = await http.get<GetWeatherForecastResponse>(
      `${WEATHER_API_URL}&q=${city}&days=7&aqi=no&alerts=no`
    );
    data.id = uuidv4();
    return data;
  } else {
    const { data } = await http.get<GetWeatherForecastResponse>(
      `${WEATHER_API_URL}&q=${city.lat},${city.lng}&days=7&aqi=no&alerts=no`
    );
    data.id = `${data.location.lat},${data.location.lon} ${data.location.name}`;
    return data;
  }
};

/**
 * Get weather data for a cities array
 * @param cities array of cities
 * @returns weather data for the cities
 */
export const getBulkWeather = async (cities: City[]) => {
  const promises = cities.map((city) =>
    getWeather({ lat: city.lat, lng: city.lng })
  );
  const data = await Promise.all(promises);
  return data;
};
