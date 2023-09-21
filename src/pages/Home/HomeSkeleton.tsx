import { WeatherCardListSkeleton } from "@/components/WeatherCardList/WeatherCardListSkeleton";

const HomeSkeleton = () => (
  <div className="mt-5 flex flex-col gap-5">
    <WeatherCardListSkeleton />
    <WeatherCardListSkeleton />
  </div>
);

export { HomeSkeleton };
