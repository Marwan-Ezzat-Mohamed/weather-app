import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import WeatherIcon from "@components/WeatherIcon";
import { City } from "@/types";
import { formatDate } from "@/utils";

interface WeatherCardProps {
  city: City;
  temp: number;
  localTime: string;
  weatherConditionText: string;
  isDay: boolean;
  id: string;
  onRemoveClick: (id: string) => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  temp,
  localTime,
  weatherConditionText,
  isDay,
  id,
  onRemoveClick,
}) => {
  const navigate = useNavigate();

  console.log({localTime})
  const formattedDate = formatDate(localTime);

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemoveClick(id);
  };

  const handleCardClick = () => {
    navigate({
      pathname: "/city",
      search: `?lat=${city.lat}&lng=${city.lng}`,
    });
  };

  return (
    <div
      onClick={handleCardClick}
      className="min-w-sm bg-secondary 0 relative flex w-full max-w-sm cursor-pointer justify-center rounded-2xl p-5 transition duration-200 hover:scale-105 hover:shadow-2xl "
    >
      <div className="w-full space-y-5">
        <div className="flex justify-between">
          <span className="rounded text-xl font-semibold">{city.name}</span>
          <div
            className="flex gap-2"
            onClick={handleIconClick}
            data-testid="remove-icon"
          >
            <AiOutlineClose className="text-3xl text-red-500 hover:text-red-700" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            <WeatherIcon
              weatherConditionText={weatherConditionText}
              isDay={isDay}
            />
            <h1 className="text-6xl">{temp.toFixed(0)}°C</h1>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-xl font-bold">{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
