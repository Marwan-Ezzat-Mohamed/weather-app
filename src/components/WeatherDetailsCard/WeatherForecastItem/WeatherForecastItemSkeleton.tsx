const WeatherForecastItemSkeleton = () => {
  return (
    <div className="dark:bg-primary/70 flex w-[90px] animate-pulse flex-col items-center rounded-2xl p-2 shadow-xl">
      <div className="bg-tertiary mb-2 h-6 w-20 rounded"></div>
      <div className="bg-tertiary mb-2 h-16 w-16 rounded-full"></div>
      <div className="bg-tertiary h-6 w-20 rounded"></div>
    </div>
  );
};

export { WeatherForecastItemSkeleton };
