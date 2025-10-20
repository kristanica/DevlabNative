import userHp from "@/assets/zustand/userHp";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { useHandleDecrementHp } from "../function/useHandleDecrementHp";
import { useHandleGameOver } from "../function/useHandleGameOver";

const codePatchTimeFreeze = (
  initialTime: number,
  setCurrentStageIndex: any,
  lessonId: string,
  category: string,
  stageId: string,
  levelId: string
) => {
  const [timer, setTimer] = useState<number>(initialTime);
  const intervalRef = useRef<any>(null);
  const [isFreezed, setIsFreezed] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const decrementUserHp = userHp?.getState().decrementUserHp;
  const { handleGameOver } = useHandleGameOver();
  const { handleDecrementHp } = useHandleDecrementHp();

  //countdown
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(initialTime);
    setIsFreezed(false);
  };

  useEffect(() => {
    if (!isFreezed && isFocused) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 0) {
            clearInterval(intervalRef.current);
            setTimeout(() => handleDecrementHp(), 200);

            const currentHp = userHp.getState().userHp;
            if (currentHp <= 1) {
              setTimeout(() => {
                handleGameOver({
                  lessonId,
                  category,
                  stageId,
                  levelId,
                  setCurrentStageIndex,
                });
              }, 0);
            }
            setTimeout(() => {
              setTimer(initialTime);
            }, 100);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isFreezed, isFocused, resetTimer, decrementUserHp]);

  const codePatch = () => {
    setTimer((prev) => prev + 30);
  };

  const timeFreeze = () => {
    setIsFreezed(true);
    setTimeout(() => setIsFreezed(false), 10000);
  };

  return { timer, codePatch, timeFreeze };
};

export default codePatchTimeFreeze;
