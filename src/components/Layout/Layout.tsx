import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "@components/Header";
import { ThemeProvider } from "@components/ThemeProvider";
import LoadingSpinner from "./LoadingSpinner";

export default function Layout() {
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const navigate = useNavigate();

  async function getLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported in your browser.");
      return;
    }
    const permissionStatus = await navigator.permissions.query({
      name: "geolocation",
    });

    const goToCity = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocationLoading(false);
          navigate({
            pathname: "/city",
            search: `?lat=${position.coords.latitude.toFixed(
              2
            )}&lng=${position.coords.longitude.toFixed(2)}`,
          });
        },
        () => {
          setIsLocationLoading(false);
        },
        {
          enableHighAccuracy: true,
        }
      );
    };

    permissionStatus.onchange = () => {
      //request permission again
      if (permissionStatus.state === "granted") {
        setIsLocationLoading(true);
        goToCity();
      }
    };

    navigator.geolocation.getCurrentPosition(() => {});
  }

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <div className="relative flex flex-grow flex-col items-center bg-primary text-primary">
        {isLocationLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="w-full max-w-5xl py-5">
            <Header />
            <div className="m-2 md:m-0">
              <Outlet />
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
