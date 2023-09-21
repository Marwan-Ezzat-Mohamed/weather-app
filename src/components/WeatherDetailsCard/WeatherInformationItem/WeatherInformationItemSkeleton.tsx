const WeatherInformationItemSkeleton = () => {
  return (
    <div className="flex justify-between gap-5 ">
      <div className="flex gap-2 ">
        <div className="bg-tertiary h-6 w-6 animate-pulse rounded-full"></div>
        <div className="bg-tertiary h-6 w-16 animate-pulse rounded-md"></div>
      </div>
      <div className="bg-tertiary h-6 w-16 animate-pulse rounded-md"></div>
    </div>
  );
};

export { WeatherInformationItemSkeleton };
