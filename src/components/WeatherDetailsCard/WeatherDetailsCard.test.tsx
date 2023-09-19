import { render, screen, fireEvent } from "@testing-library/react";
import WeatherDetailsCard from "./WeatherDetailsCard";

const mockWeatherHour = [
  {
    time_epoch: 1630549200,
    time: "2021-09-02 00:00",
    temp_c: 20.0,
    temp_f: 68.0,
    is_day: 0,

    condition: {
      text: "Clear",
      icon: "//cdn.weatherapi.com/weather/64x64/night/113.png",
      code: 1000,
    },
    wind_mph: 4.5,
    wind_kph: 7.2,
    wind_degree: 0,
    wind_dir: "N",
    pressure_mb: 1014.0,
    pressure_in: 30.4,
    precip_mm: 0.0,
    precip_in: 0.0,
    humidity: 50,
    cloud: 0,
    feelslike_c: 22.0,
    feelslike_f: 71.6,
    windchill_c: 20.0,

    windchill_f: 68.0,
    heatindex_c: 22.0,
    heatindex_f: 71.6,
    dewpoint_c: 9.0,
    dewpoint_f: 48.2,
    will_it_rain: 0,
    chance_of_rain: 0,
    will_it_snow: 0,
    chance_of_snow: 0,
    vis_km: 10.0,
    vis_miles: 6.0,
    gust_mph: 6.9,
    gust_kph: 11.2,
    uv: 1.0,
  },
  // Add more sample data as needed
];

const sampleCity = {
  id: "1",
  name: "Sample City",
  lat: 123.45,
  lng: 67.89,
};

const mockProps = {
  city: sampleCity,
  temp: 20,
  localTime: "2023-09-20T15:30:00Z",
  weatherConditionText: "Clear",
  isDay: true,
  humidity: 50,
  wind: 10,
  feelsLike: 22,
  maxTemp: 30,
  minTemp: 15,
  pressure: 1010,
  description: "Clear sky",
  isFavorite: false,
  weatherHour: mockWeatherHour,
  onFavoriteClick: jest.fn(),
};

describe("WeatherDetailsCard Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<WeatherDetailsCard {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it("displays city name", () => {
    render(<WeatherDetailsCard {...mockProps} />);
    const cityNameElement = screen.getByText(sampleCity.name);
    expect(cityNameElement).toBeInTheDocument();
  });

  it("handles favorite click", () => {
    const mockOnFavoriteClick = jest.fn();
    render(
      <WeatherDetailsCard
        {...mockProps}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );
    const favoriteIcon = screen.getByTestId("favorite-icon");

    fireEvent.click(favoriteIcon);
    expect(mockOnFavoriteClick).toHaveBeenCalled();
  });

  // Add more test cases to cover other component features
});
