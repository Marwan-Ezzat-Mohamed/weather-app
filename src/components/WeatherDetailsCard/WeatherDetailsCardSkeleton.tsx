import { WeatherInformationItemSkeleton } from "./WeatherInformationItem/WeatherInformationItemSkeleton";
import { WeatherForecastItemSkeleton } from "./WeatherForecastItem/WeatherForecastItemSkeleton";

const WeatherDetailsCardSkeleton = () => {
  return (
    <div className="flex w-full justify-center rounded-2xl bg-slate-100 p-5 transition duration-200 hover:shadow-2xl dark:bg-slate-800">
      <div className="w-full space-y-5">
        <div className="flex justify-between text-2xl">
          <div className="h-6 w-1/3 animate-pulse rounded-md bg-gray-300 dark:bg-gray-500 "></div>
          <div className="h-6 w-1/3 animate-pulse rounded-md bg-gray-300 dark:bg-gray-500"></div>
        </div>
        <section className="flex justify-around">
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <div className="h-24 w-24 animate-pulse rounded-full bg-gray-300 dark:bg-gray-500"></div>
              <div className="ml-4 h-32 w-32 animate-pulse rounded-md bg-gray-300 dark:bg-gray-500"></div>
            </div>
          </div>
          <div className="flex flex-col text-2xl">
            <div className="mb-5 flex justify-between gap-5">
              <div className="h-6 w-2/3 animate-pulse rounded-md bg-gray-300 dark:bg-gray-500"></div>
              <div className="h-6 w-1/3 animate-pulse rounded-md bg-gray-300 dark:bg-gray-500"></div>
            </div>
            <div className="flex flex-col gap-2">
              <WeatherInformationItemSkeleton />
              <WeatherInformationItemSkeleton />
              <WeatherInformationItemSkeleton />
              <WeatherInformationItemSkeleton />
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-2">
          <span className="h-7 w-2/3 animate-pulse rounded bg-gray-400 dark:bg-gray-500"></span>

          <div className="flex flex-wrap justify-center gap-5">
            <WeatherForecastItemSkeleton />
            <WeatherForecastItemSkeleton />
            <WeatherForecastItemSkeleton />
            <WeatherForecastItemSkeleton />
            <WeatherForecastItemSkeleton />
            <WeatherForecastItemSkeleton />
          </div>
        </section>
      </div>
    </div>
  );
};

export default WeatherDetailsCardSkeleton;
