import { NotesSkeleton } from "@components/Notes/NotesSkeleton";
import WeatherDetailsCardSkeleton from "@components/WeatherDetailsCard/WeatherDetailsCardSkeleton";

const WeatherDetailsSkeleton = () => {
  return (
    <div className="mt-5 flex w-full flex-col justify-between">
      <div className="min-w-3xl flex w-full max-w-3xl flex-col flex-wrap items-center justify-center gap-5 self-center">
        <WeatherDetailsCardSkeleton />
        <NotesSkeleton />
      </div>
    </div>
  );
};

export { WeatherDetailsSkeleton };
