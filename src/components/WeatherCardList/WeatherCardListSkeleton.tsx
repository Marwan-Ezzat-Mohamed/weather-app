import { WeatherCardSkeleton } from "@components/WeatherCard/WeatherCardSkeleton";

const WeatherCardListSkeleton = () => (
  <>
    <span>
      <span className="h-8 w-36 animate-pulse rounded-xl bg-gray-300 text-3xl font-bold dark:bg-gray-500"></span>
    </span>

    <div className="flex flex-wrap items-center justify-center gap-5">
      <WeatherCardSkeleton />
      <WeatherCardSkeleton />
    </div>
  </>
);

export { WeatherCardListSkeleton };
