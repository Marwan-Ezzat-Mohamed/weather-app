import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "@components/Header";
import { ThemeProvider } from "@components/ThemeProvider";

export default function Layout() {
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
      navigator.geolocation.getCurrentPosition((position) => {
        navigate({
          pathname: "/city",
          search: `?lat=${position.coords.latitude}&lng=${position.coords.longitude}`,
        });
      });
    };

    permissionStatus.onchange = () =>
      permissionStatus.state === "granted" && goToCity();

    permissionStatus.state === "prompt" && goToCity();
  }

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <div className="relative flex flex-grow flex-col items-center bg-primary text-primary">
        <div className="w-full max-w-5xl py-5">
          <Header />
          <div className="m-2 md:m-0">
            <Outlet />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
