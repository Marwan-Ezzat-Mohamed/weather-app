const WeatherForecastItemSkeleton = () => {
  return (
    <div className="flex w-[90px] animate-pulse flex-col items-center rounded-2xl p-2 shadow-xl dark:bg-slate-900/70">
      <div className="mb-2 h-6 w-20 rounded bg-gray-300 dark:bg-gray-500"></div>
      <div className="mb-2 h-16 w-16 rounded-full bg-gray-300 dark:bg-gray-500"></div>
      <div className="h-6 w-20 rounded bg-gray-300 dark:bg-gray-500"></div>
    </div>
  );
};

export { WeatherForecastItemSkeleton };
