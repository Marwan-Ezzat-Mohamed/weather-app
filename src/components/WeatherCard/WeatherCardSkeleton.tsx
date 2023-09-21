const WeatherCardSkeleton = () => (
  <div className="min-w-sm relative flex w-full max-w-sm animate-pulse justify-center rounded-2xl bg-secondary p-5 ">
    <div className="w-full space-y-5">
      <div className="flex justify-between">
        <span className="bg-tertiary h-7 w-2/3 animate-pulse rounded"></span>
        <div className="flex gap-2">
          <div className="h-7 w-7 animate-pulse "></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <div className="bg-tertiary h-24 w-24 animate-pulse rounded-full"></div>
          <span className="bg-tertiary h-20 w-24 animate-pulse rounded"></span>
        </div>
        <div className="flex items-center justify-center">
          <span className="bg-tertiary h-7 w-20 animate-pulse rounded font-bold"></span>
        </div>
      </div>
    </div>
  </div>
);

export { WeatherCardSkeleton };
