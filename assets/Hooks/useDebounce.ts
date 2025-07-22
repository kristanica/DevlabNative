import { useEffect, useState } from "react";

const useDebounce = (interval: number, value: string) => {
  const [debounce, setDebounce] = useState<string>("");

  useEffect(() => {
    const unsub = setTimeout(() => {
      setDebounce(value);
    }, interval);

    return () => clearTimeout(unsub);
  }, [value, interval]);

  return debounce;
};

export default useDebounce;
