import { render, fireEvent, screen } from "@testing-library/react";
import WeatherCard from "./WeatherCard";
import { MemoryRouter as Router } from "react-router-dom";

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

describe("WeatherCard Component", () => {
  const sampleCity = {
    id: "1",
    name: "Sample City",
    lat: 123.45,
    lng: 67.89,
  };

  const sampleProps = {
    city: sampleCity,
    temp: 25,
    localTime: "2023-09-20T15:30:00Z",
    weatherConditionText: "Sunny",
    isDay: true,
    id: "1",
    onRemoveClick: jest.fn(),
  };

  beforeEach(() => {
    sampleProps.onRemoveClick.mockClear();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <Router>
        <WeatherCard {...sampleProps} />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });

  it("renders the component with provided data", () => {
    render(
      <Router>
        <WeatherCard {...sampleProps} />
      </Router>
    );

    // Ensure that the component renders with correct city name and temperature
    expect(screen.getByText(sampleCity.name)).toBeInTheDocument();
    expect(screen.getByText(`${sampleProps.temp}°C`)).toBeInTheDocument();
  });

  it("handles card click", () => {
    render(<WeatherCard {...sampleProps} />);

    // Simulate a card click
    fireEvent.click(screen.getByText(sampleCity.name));

    // Ensure that navigate function was called with the correct pathname and search
    expect(mockUsedNavigate).toHaveBeenCalledWith({
      pathname: "/city",
      search: `?lat=${sampleCity.lat}&lng=${sampleCity.lng}`,
    });
  });

  it("handles remove icon click", () => {
    render(
      <Router>
        <WeatherCard {...sampleProps} />
      </Router>
    );

    // Simulate a remove icon click
    fireEvent.click(screen.getByTestId("remove-icon"));

    // Ensure that onRemoveClick prop was called with the correct id
    expect(sampleProps.onRemoveClick).toHaveBeenCalledWith("1");
  });
});
