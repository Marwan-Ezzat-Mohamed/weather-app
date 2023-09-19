import { WeatherCardSkeleton } from "@components/WeatherCard/WeatherCardSkeleton";

const HomeSkeleton = () => (
  <div className="mt-5 flex flex-col gap-5">
    <span>
      <span className="h-8 w-36 animate-pulse rounded-xl bg-gray-300 text-3xl font-bold dark:bg-gray-500"></span>
    </span>

    <div className="flex flex-wrap items-center justify-center gap-5">
      <WeatherCardSkeleton />
      <WeatherCardSkeleton />
    </div>
    <span>
      <span className="h-8 w-36 animate-pulse rounded-xl bg-gray-300 text-3xl font-bold dark:bg-gray-500"></span>
    </span>

    <div className="flex flex-wrap items-center justify-center gap-5">
      <WeatherCardSkeleton />
      <WeatherCardSkeleton />
    </div>
  </div>
);

export { HomeSkeleton };
