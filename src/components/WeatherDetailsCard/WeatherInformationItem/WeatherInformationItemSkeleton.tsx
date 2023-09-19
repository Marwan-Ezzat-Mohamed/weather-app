const WeatherInformationItemSkeleton = () => {
  return (
    <div className="flex justify-between gap-5 ">
      <div className="flex gap-2 ">
        <div className="h-6 w-6 animate-pulse rounded-full bg-gray-300 dark:bg-gray-500"></div>
        <div className="h-6 w-16 animate-pulse rounded-md bg-gray-300 dark:bg-gray-500"></div>
      </div>
      <div className="h-6 w-16 animate-pulse rounded-md bg-gray-300 dark:bg-gray-500"></div>
    </div>
  );
};

export { WeatherInformationItemSkeleton };
