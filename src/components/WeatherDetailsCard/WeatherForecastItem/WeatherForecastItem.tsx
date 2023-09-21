import WeatherIcon from "@components/WeatherIcon";

interface WeatherForecastItemProps {
  weather: {
    time: string;
    conditionText: string;
    temp_c: number;
    isDay: boolean;
  };
  formattedTime: string;
}

const WeatherForecastItem = ({
  weather: { time, conditionText, temp_c, isDay },
  formattedTime,
}: WeatherForecastItemProps) => {
  return (
    <div
      key={time}
      className="bg-primary flex w-[90px] flex-col items-center rounded-2xl p-2 shadow-xl"
    >
      <div className="text-center text-xl">{formattedTime}</div>
      <div className="flex justify-center">
        <WeatherIcon weatherConditionText={conditionText} isDay={isDay} />
      </div>
      <div className="text-center text-xl">{temp_c.toFixed(0)}°</div>
    </div>
  );
};

export default WeatherForecastItem;
