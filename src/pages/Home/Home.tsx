import { useQuery } from "@tanstack/react-query";
import { getBulkWeather, getTopPopulatedCities } from "../../services";
import useLocalStorage from "@/hooks/useLocalStorage";
import { City } from "@/types";
import { HomeSkeleton } from "./HomeSkeleton";
import { WeatherCardList } from "@components/WeatherCardList";

const Home = () => {
  const [favoriteCities, setFavoriteCities] = useLocalStorage<City[]>(
    "favoriteCities",
    []
  );
  const [hiddenCities, setHiddenCities] = useLocalStorage<
    Record<string, boolean>
  >("hiddenCities", {});

  const {
    error: topPopulatedCitiesError,
    data: topPopulatedCities,
    isInitialLoading: topPopulatedCitiesIsInitialLoading,
  } = useQuery({
    queryKey: ["topPopulatedCities"],
    queryFn: () => getTopPopulatedCities(),
  });

  const {
    error: topPopulatedCitiesWeatherError,
    data: topPopulatedCitiesWeather,
    isInitialLoading: topPopulatedCitiesWeatherIsInitialLoading,
  } = useQuery({
    queryKey: ["topPopulatedCitiesWeather", topPopulatedCities],
    queryFn: () => getBulkWeather(topPopulatedCities ?? []),

    enabled: !!topPopulatedCities && topPopulatedCities.length > 0,
  });
  const {
    error: favoriteCitiesWeatherError,
    data: favoriteCitiesWeather,
    isInitialLoading: favoriteCitiesWeatherIsInitialLoading,
  } = useQuery({
    queryKey: ["favoriteCitiesWeather", favoriteCities], // Use a stringified version of favoriteCities as the key
    queryFn: () => getBulkWeather(favoriteCities),
    enabled: !!favoriteCities && favoriteCities.length > 0,
  });

  const onFavoriteRemoveClick = (id: string) => {
    setFavoriteCities((prev) => {
      return prev.filter((city) => city.id !== id);
    });
  };

  const onTopPopulatedRemoveClick = (id: string) => {
    setHiddenCities((prev) => {
      return {
        ...prev,
        [id]: true,
      };
    });
  };

  const isLoading =
    topPopulatedCitiesIsInitialLoading &&
    topPopulatedCitiesWeatherIsInitialLoading &&
    favoriteCitiesWeatherIsInitialLoading;

  const isError =
    topPopulatedCitiesError ||
    topPopulatedCitiesWeatherError ||
    favoriteCitiesWeatherError;

  if (isLoading) {
    return <HomeSkeleton />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  const filteredTopPopulatedCitiesWeather = topPopulatedCitiesWeather?.filter(
    (w) => !hiddenCities[w.id]
  );

  return (
    <div className="mt-5 flex flex-col gap-5">
      <WeatherCardList
        weatherData={favoriteCitiesWeather ?? []}
        onRemoveClick={onFavoriteRemoveClick}
        isLoading={favoriteCitiesWeatherIsInitialLoading}
        label="Favorite Cities"
      />
      <WeatherCardList
        weatherData={filteredTopPopulatedCitiesWeather ?? []}
        onRemoveClick={onTopPopulatedRemoveClick}
        isLoading={topPopulatedCitiesWeatherIsInitialLoading}
        label="Top Populated Cities"
      />
    </div>
  );
};

export default Home;
