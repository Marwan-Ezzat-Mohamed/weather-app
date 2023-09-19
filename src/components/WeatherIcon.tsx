import React from "react";

import ReactAnimatedWeather from "react-animated-weather";
import { weather_mapping } from "@/utils/constants";

interface WeatherIconProps {
  big?: boolean;
  weatherConditionText: string;
  isDay: boolean;
}
const getIcon = (weatherConditionText: string, isDay: boolean): string => {
  const query = weatherConditionText as keyof typeof weather_mapping;
  if (query === "Partly cloudy" && isDay) {
    return "PARTLY_CLOUDY_DAY";
  }
  if (query === "Partly cloudy" && !isDay) {
    return "PARTLY_CLOUDY_NIGHT";
  }
  return weather_mapping[query] || "CLEAR_DAY";
};

const WeatherIcon: React.FC<WeatherIconProps> = ({
  big,
  weatherConditionText,
  isDay,
}) => {
  const defaults = {
    icon: getIcon(weatherConditionText, isDay),
    color: "goldenrod",
    size: big ? 140 : 70,
    animate: true,
  };

  return (
    <ReactAnimatedWeather
      icon={defaults.icon}
      color={defaults.color}
      size={defaults.size}
      animate={defaults.animate}
    />
  );
};

export default WeatherIcon;
