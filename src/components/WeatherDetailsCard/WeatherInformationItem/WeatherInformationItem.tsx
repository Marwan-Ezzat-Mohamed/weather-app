interface IWeatherInformationItemProps {
  label: string;
  valueLabel: string;
  Icon: React.FC;
}

const WeatherInformationItem = ({
  label,
  valueLabel,
  Icon,
}: IWeatherInformationItemProps) => (
  <div className="flex justify-start">
    <div className="flex w-40 items-center gap-2 text-center text-3xl">
      <Icon />
      <span className="text-2xl">{label}</span>
    </div>
    <h1 className="text-2xl"> {valueLabel} </h1>
  </div>
);

export default WeatherInformationItem;
