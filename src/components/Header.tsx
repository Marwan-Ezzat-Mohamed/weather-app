import { useEffect, useState } from "react";
import { useTheme } from "@components/ThemeProvider";
import { BsFillMoonStarsFill, BsSun } from "react-icons/bs";
import { AutoCompleteInput } from "@components/common/AutoCompleteInput";
import { useDebounce } from "@/hooks/useDebounce";
import { getCitiesByName } from "@/services";
import { Link, useNavigate } from "react-router-dom";
import { City } from "@/types";

const Header: React.FC = () => {
  const { setTheme, theme } = useTheme();
  const navigate = useNavigate();

  const [options, setOptions] = useState<City[]>([]);
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce<string>(value, 100);

  const handleOptionClick = (option: City) => {
    setValue("");
    navigate({
      pathname: "/city",
      search: `?lat=${option.lat.toFixed(2)}&lng=${option.lng.toFixed(2)}`,
    });
  };

  useEffect(() => {
    const getOptions = async () => {
      if (debouncedValue.length === 0) {
        setOptions([]);
        return;
      }
      const autoCompleteOptions = await getCitiesByName(debouncedValue);
      setOptions(autoCompleteOptions);
    };
    getOptions();
  }, [debouncedValue]);

  return (
    <header>
      <div className="flex justify-between text-primary ">
        <Link to="/">
          <h1 className="text-3xl">React Weather</h1>
        </Link>
        <div className="w-1/2">
          <AutoCompleteInput
            value={value}
            onChange={setValue}
            options={options}
            placeholder="Search for a city"
            handleOptionClick={handleOptionClick}
          />
        </div>
        <button
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full text-3xl focus:outline-none"
        >
          {theme === "dark" ? <BsFillMoonStarsFill /> : <BsSun />}
        </button>
      </div>
    </header>
  );
};

export { Header };
