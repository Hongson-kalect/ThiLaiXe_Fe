import { useState, useEffect } from "react";

export const useDebounce = (input: string, time?: number) => {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    timeOut = setTimeout(() => {
      setDebounceValue(input);
    }, time || 500);

    return () => clearTimeout(timeOut);
  }, [input]);

  return debounceValue;
};
