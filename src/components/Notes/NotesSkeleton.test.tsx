import { render } from "@testing-library/react";
import { NotesSkeleton } from "./NotesSkeleton";

test("WeatherCardSkeleton matches snapshot", () => {
  const { container } = render(<NotesSkeleton />);
  expect(container).toMatchSnapshot();
});
