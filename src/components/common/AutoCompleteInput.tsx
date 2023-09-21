import { useState, useRef, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "./Input";
import { cn } from "@/utils";

type IAutoCompleteInputProps<T> = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: T extends { name: string; id: number | string } ? T[] : never;
  handleOptionClick: (option: T) => void;
};

const AutoCompleteInput = <T,>(props: IAutoCompleteInputProps<T>) => {
  const [isOptionsShown, setIsOptionsShown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => {
    setIsOptionsShown(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    props.onChange(value);
  };

  const handleOptionClick = (option: T) => {
    setIsOptionsShown(false);
    props.handleOptionClick(option);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      //if the click is outside the input and the options
      if (
        !inputRef.current?.contains(e.target as Node) &&
        !optionsRef.current?.contains(e.target as Node)
      ) {
        setIsOptionsShown(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOptionsShown]);

  return (
    <div className="relative w-full">
      <div className="relative h-10">
        <Input
          ref={inputRef}
          type="search"
          value={props.value}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder={props.placeholder}
        />
        <AiOutlineSearch className="absolute -top-1 right-1 translate-y-1/2 transform cursor-pointer p-0 text-2xl text-gray-500" />
      </div>
      {props.options.length > 0 && (
        <div
          ref={optionsRef}
          className={cn(
            "absolute z-10 mt-2 flex w-full appearance-none flex-col rounded-md bg-secondary shadow-lg",
            isOptionsShown ? "block" : "hidden"
          )}
        >
          {props.options.map((option) => (
            <div
              key={option.id}
              className="hover:bg-tertiary flex w-full cursor-pointer bg-secondary px-2 py-1"
              onClick={() => handleOptionClick(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { AutoCompleteInput };
