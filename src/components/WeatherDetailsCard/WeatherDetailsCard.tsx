import { useMemo } from "react";
import { FaWind } from "react-icons/fa";
import { MdWaterDrop } from "react-icons/md";
import { WiBarometer } from "react-icons/wi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { TiArrowUpThick, TiArrowDownThick } from "react-icons/ti";
import { WeatherForecastItem } from "./WeatherForecastItem";
import { WeatherInformationItem } from "./WeatherInformationItem";
import WeatherIcon from "@components/WeatherIcon";
import { City } from "@/types";
import { HOUR, formatDate } from "@/utils";
import { WeatherHour } from "@/services/types";

interface IWeatherDetailsCardProps {
  city: City;
  temp: number;
  humidity: number;
  wind: number;
  feelsLike: number;
  maxTemp: number;
  minTemp: number;
  pressure: number;
  localTime: string;
  description: string;
  isFavorite: boolean;
  weatherConditionText: string;
  isDay: boolean;
  weatherHour: WeatherHour[];
  onFavoriteClick: () => void;
}

const FORECAST_HOURS = 6;
const WeatherDetailsCard = ({
  city,
  temp,
  localTime,
  weatherConditionText,
  isDay,
  humidity,
  wind,
  feelsLike,
  maxTemp,
  minTemp,
  pressure,
  description,
  isFavorite,
  weatherHour,
  onFavoriteClick,
}: IWeatherDetailsCardProps) => {
  const formattedDate = formatDate(localTime);

  const filteredWeatherHour = weatherHour.filter((w) => {
    //get the next 7 hours from now (including the current hour) and not the past ones
    const time = new Date(w.time).getTime();
    const now = new Date().getTime();
    return time >= now && time <= now + FORECAST_HOURS * HOUR;
  });

  const weatherInfoItems = useMemo(
    () => [
      {
        label: "Max",
        valueLabel: `${maxTemp.toFixed(0)}°`,
        Icon: TiArrowUpThick,
      },
      {
        label: "Min",
        valueLabel: `${minTemp.toFixed(0)}°`,
        Icon: TiArrowDownThick,
      },
      {
        label: "Wind",
        valueLabel: `${wind.toFixed(0)}kph`,
        Icon: FaWind,
      },
      {
        label: "Humidity",
        valueLabel: `${humidity.toFixed(0)}%`,
        Icon: MdWaterDrop,
      },
      {
        label: "Pressure",
        valueLabel: `${pressure.toFixed(0)}hPa`,
        Icon: WiBarometer,
      },
    ],
    [humidity, maxTemp, minTemp, pressure, wind]
  );

  return (
    <div className="bg-secondary relative flex  w-full justify-center rounded-2xl p-5 transition duration-200 hover:shadow-xl">
      <div
        className="absolute bottom-0 left-0 m-2 text-4xl text-yellow-500"
        onClick={onFavoriteClick}
        data-testid="favorite-icon"
      >
        {isFavorite ? <AiFillStar /> : <AiOutlineStar />}
      </div>
      <div className="w-full space-y-5">
        <div className="flex justify-between text-2xl">
          <span className="font-bold">{city.name}</span>
          <span className="font-semibold ">{formattedDate}</span>
        </div>
        <section className="flex flex-col items-center justify-around md:flex-row">
          <div className=" flex flex-col items-center  ">
            <div className="flex items-center  ">
              <WeatherIcon
                weatherConditionText={weatherConditionText}
                big={true}
                isDay={isDay}
              />

              <div className="flex items-center justify-center">
                <h1 className="text-8xl"> {temp.toFixed(0)}°C</h1>
              </div>
            </div>
            <span className="text-4xl font-semibold capitalize">
              {description}
            </span>
          </div>
          <div className="flex flex-col text-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h1> Feels like {feelsLike.toFixed(0)}° </h1>
            </div>
            {weatherInfoItems.map((item, index) => (
              <WeatherInformationItem
                key={index}
                label={item.label}
                valueLabel={item.valueLabel}
                Icon={item.Icon}
              />
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">
            Next {filteredWeatherHour.length} hours
          </h1>
          <div className="flex flex-wrap justify-center gap-5">
            {filteredWeatherHour?.map((w) => {
              const time = new Date(w.time).getTime();
              const formattedTime = new Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                hour12: true,
              }).format(time);
              return (
                <WeatherForecastItem
                  weather={{
                    time: w.time,
                    conditionText: w.condition.text,
                    temp_c: w.temp_c,
                    isDay: !!w.is_day,
                  }}
                  formattedTime={formattedTime}
                  key={w.time}
                />
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default WeatherDetailsCard;
