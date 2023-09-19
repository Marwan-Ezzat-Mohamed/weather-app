import { render } from "@testing-library/react";
import { WeatherCardSkeleton } from "./WeatherCardSkeleton";

test("WeatherCardSkeleton matches snapshot", () => {
  const { container } = render(<WeatherCardSkeleton />);
  expect(container).toMatchSnapshot();
});
