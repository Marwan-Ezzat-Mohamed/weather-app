import { WeatherCardSkeleton } from "@components/WeatherCard/WeatherCardSkeleton";

const WeatherCardListSkeleton = () => (
  <>
    <span className="bg-tertiary h-8 w-36 animate-pulse rounded-xl text-3xl font-bold"></span>

    <div className="flex flex-wrap items-center justify-center gap-5">
      <WeatherCardSkeleton />
      <WeatherCardSkeleton />
    </div>
  </>
);

export { WeatherCardListSkeleton };
