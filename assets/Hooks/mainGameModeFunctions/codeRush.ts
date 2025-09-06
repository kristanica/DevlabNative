import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";

const codeRush = (initialTime: number) => {
  const [timer, setTimer] = useState<number>(initialTime);
  const intervalRef = useRef<any>(null);
  const [isFreezed, setIsFreezed] = useState<boolean>(false);
  const isFocused = useIsFocused();
  //countdown
  useEffect(() => {
    if (!isFreezed && isFocused) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 0) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isFreezed, isFocused]);

  const codePatch = () => {
    setTimer((prev) => prev + 30);
  };

  const timeFreeze = () => {
    setIsFreezed(true);
    setTimeout(() => setIsFreezed(false), 10000);
  };

  return { timer, codePatch, timeFreeze };
};

export default codeRush;
