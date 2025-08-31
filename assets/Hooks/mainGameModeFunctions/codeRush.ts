import { useEffect, useState } from "react";

const codeRush = (initialTime: number) => {
  const [timer, setTimer] = useState<number>(initialTime);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return { timer };
};

export default codeRush;
