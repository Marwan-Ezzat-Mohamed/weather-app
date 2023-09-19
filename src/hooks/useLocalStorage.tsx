import { useState, useEffect } from "react";

function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    let currentValue: T;

    try {
      const storedValue = localStorage.getItem(key);
      currentValue = storedValue
        ? (JSON.parse(storedValue) as T)
        : defaultValue;
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export default useLocalStorage;
