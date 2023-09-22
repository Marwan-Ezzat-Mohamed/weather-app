import { GetWeatherForecastResponse } from "@/services/types";
import { WeatherCard } from "@components/WeatherCard";
import { WeatherCardListSkeleton } from "./WeatherCardListSkeleton";

interface WeatherCardListProps {
  weatherData: GetWeatherForecastResponse[];
  onRemoveClick: (id: string) => void;
  isLoading: boolean;
  label: string;
}

const WeatherCardList = ({
  weatherData,
  onRemoveClick,
  isLoading,
  label,
}: WeatherCardListProps) => {
  if (isLoading) return <WeatherCardListSkeleton />;
  if (!weatherData || weatherData.length === 0) return null;

  weatherData.sort((a, b) => {
    return a.location.name.localeCompare(b.location.name);
  });
  return (
    <section className="flex flex-col gap-5">
      <span>
        <h1 className="text-3xl font-bold">{label}</h1>
      </span>

      <div className="flex flex-wrap items-center justify-center gap-5  ">
        {weatherData?.map((w) => {
          return (
            <WeatherCard
              city={{
                id: w.id,
                name: w.location.name + ", " + w.location.country,
                lat: w.location.lat,
                lng: w.location.lon,
              }}
              temp={w.current.temp_c}
              localTime={w.location.localtime}
              weatherConditionText={w.current.condition.text}
              isDay={!!w.current.is_day}
              id={w.id}
              onRemoveClick={onRemoveClick}
              key={w.id}
            />
          );
        })}
      </div>
    </section>
  );
};

export default WeatherCardList;
