import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { WeatherDetails } from "./pages/WeatherDetails";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/city",

        element: <WeatherDetails />,
      },
    ],
  },
]);
