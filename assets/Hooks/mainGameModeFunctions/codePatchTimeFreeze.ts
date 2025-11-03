import { isEvaluatingStore } from "@/assets/zustand/isEvaluatingStore";
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
  levelId: string,
  isFreezed: boolean,
  setIsFreezed: React.Dispatch<React.SetStateAction<boolean>>,
  isStageAlreadyCompleted: any,
  gameOverModal: any
) => {
  const [timer, setTimer] = useState<number>(initialTime);
  const intervalRef = useRef<any>(null);

  const isFocused = useIsFocused();
  const { handleGameOver } = useHandleGameOver(gameOverModal);
  const { handleDecrementHp } = useHandleDecrementHp();
  const isEvaluating = isEvaluatingStore((state) => state.isEvaluating);

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(initialTime);
    setIsFreezed(false);
  };

  useEffect(() => {
    if (!isFreezed && isFocused && !isEvaluating && !isStageAlreadyCompleted) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 0) {
            clearInterval(intervalRef.current);

            setTimeout(() => {
              // Decrement HP and then check the updated HP value
              handleDecrementHp();

              const newHp = userHp.getState().userHp; // ✅ get the updated HP after decrement
              if (newHp <= 0) {
                handleGameOver({
                  lessonId,
                  category,
                  stageId,
                  levelId,
                  setCurrentStageIndex,
                });
              }
            }, 200);

            // Reset the timer after running out
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
  }, [isFreezed, isFocused, resetTimer, isEvaluating]);

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
