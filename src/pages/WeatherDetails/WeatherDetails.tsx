import { useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import Notes from "@components/Notes";
import { WeatherDetailsCard } from "@components/WeatherDetailsCard";
import { WeatherDetailsSkeleton } from "./WeatherDetailsSkeleton";
import { mapServerResponseToWeatherToProps } from "@/utils";
import { useRouterQuery } from "@hooks/useRouterQuery";
import useLocalStorage from "@hooks/useLocalStorage";
import { getWeather } from "@/services";
import { City, Note } from "@/types";

const WeatherDetails = () => {
  const [notes, setNotes] = useLocalStorage<Record<string, Note[]>>(
    "notes",
    {}
  );
  const [favoriteCities, setFavoriteCities] = useLocalStorage<City[]>(
    "favoriteCities",
    []
  );

  const routerQuery = useRouterQuery();
  const lat = routerQuery.get("lat");
  const lng = routerQuery.get("lng");

  const {
    isInitialLoading: weatherIsInitialLoading,
    error: weatherError,
    data: weather,
  } = useQuery({
    queryKey: ["forecast", lat, lng],
    queryFn: () =>
      getWeather({
        lat: Number(lat),
        lng: Number(lng),
      }),
    enabled: !!lat && !!lng,
  });

  const handleSaveNote = (note: string) => {
    if (!weather || !note) return;
    setNotes((prev) => {
      return {
        ...prev,
        [weather.id]: [
          ...(prev[weather.id] || []),
          {
            id: uuidv4(),
            content: note,
          },
        ],
      };
    });
  };

  const handleDeleteNote = (noteId: string) => {
    if (!weather) return;
    setNotes((prev) => {
      return {
        ...prev,
        [weather.id]: prev[weather.id]?.filter((note) => note.id !== noteId),
      };
    });
  };

  const handleEditNote = (noteId: string, content: string) => {
    if (!weather) return;
    setNotes((prev) => {
      return {
        ...prev,
        [weather.id]: prev[weather.id]?.map((note) => {
          if (note.id === noteId) {
            return {
              ...note,
              content,
            };
          }
          return note;
        }),
      };
    });
  };

  const handleFavoriteClick = useCallback(() => {
    if (!weather) return;

    if (favoriteCities.some((city) => city.id === weather.id)) {
      //remove from favorites
      setFavoriteCities((prev) =>
        prev.filter((city) => city.id !== weather.id)
      );
    } else {
      //add to favorites
      const city = {
        id: weather.id,
        name: weather.location.name + ", " + weather.location.country,
        lat: weather.location.lat,
        lng: weather.location.lon,
      };
      setFavoriteCities((prev) => [...prev, city]);
    }
  }, [weather, favoriteCities, setFavoriteCities]);

  const weatherDetailsCardProps = useMemo(
    () =>
      mapServerResponseToWeatherToProps(
        weather,
        favoriteCities,
        handleFavoriteClick
      ),
    [weather, favoriteCities, handleFavoriteClick]
  );

  if (weatherIsInitialLoading) {
    return <WeatherDetailsSkeleton />;
  }
  if (!weatherDetailsCardProps || !weather || weatherError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="mt-5 flex w-full flex-col justify-between">
      <div className="min-w-3xl flex w-full max-w-3xl flex-col flex-wrap items-center justify-center gap-5 self-center">
        <WeatherDetailsCard {...weatherDetailsCardProps} />

        <Notes
          notes={notes[weather.id]}
          onSaveNote={handleSaveNote}
          onEditNote={handleEditNote}
          onDeleteNote={handleDeleteNote}
        />
      </div>
    </div>
  );
};

export default WeatherDetails;
