const WeatherCardSkeleton = () => (
  <div className="min-w-sm relative flex w-full max-w-sm animate-pulse justify-center rounded-2xl bg-gray-300 p-5 dark:bg-gray-600">
    <div className="w-full space-y-5">
      <div className="flex justify-between">
        <span className="h-7 w-2/3 animate-pulse rounded bg-gray-400 dark:bg-gray-500"></span>
        <div className="flex gap-2">
          <div className="h-7 w-7 animate-pulse text-3xl text-gray-400"></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <div className="h-24 w-24 animate-pulse rounded-full bg-gray-400 dark:bg-gray-500"></div>
          <span className="h-20 w-24 animate-pulse rounded bg-gray-400 text-6xl dark:bg-gray-500"></span>
        </div>
        <div className="flex items-center justify-center">
          <span className="h-7 w-20 animate-pulse rounded bg-gray-400 text-xl font-bold dark:bg-gray-500"></span>
        </div>
      </div>
    </div>
  </div>
);

export { WeatherCardSkeleton };
