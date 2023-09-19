import { render } from "@testing-library/react";
import WeatherDetailsCardSkeleton from "./WeatherDetailsCardSkeleton";

test("WeatherCardSkeleton matches snapshot", () => {
  const { container } = render(<WeatherDetailsCardSkeleton />);
  expect(container).toMatchSnapshot();
});
