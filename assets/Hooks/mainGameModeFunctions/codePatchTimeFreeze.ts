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
  setIsFreezed: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [timer, setTimer] = useState<number>(initialTime);
  const intervalRef = useRef<any>(null);

  const isFocused = useIsFocused();
  const decrementUserHp = userHp?.getState().decrementUserHp;
  const { handleGameOver } = useHandleGameOver();
  const { handleDecrementHp } = useHandleDecrementHp();
  const isEvaluating = isEvaluatingStore((state) => state.isEvaluating);
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(initialTime);
    setIsFreezed(false);
  };

  // Prevents cheating when user exits the game. Uses the last reset savedTime
  // useEffect(() => {
  //   (async () => {
  //     const savedTime = await AsyncStorage.getItem("savedTime");
  //     if (savedTime) {
  //       if (savedTime === "0") {
  //         setTimer(Number(initialTime));
  //       }
  //       setTimer(Number(savedTime));
  //     }
  //   })();
  // }, []);

  // // Always saves the last reset time. Might be expensive
  // useEffect(() => {
  //   (async () => {
  //     await AsyncStorage.setItem("savedTime", String(timer));
  //   })();
  // }, [timer]);

  useEffect(() => {
    if (!isFreezed && isFocused && !isEvaluating) {
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
  }, [isFreezed, isFocused, resetTimer, decrementUserHp, isEvaluating]);

  const codePatch = () => {
    setTimer((prev) => prev + 30);
  };

  const timeFreeze = () => {
    setIsFreezed(true);
    setTimeout(() => setIsFreezed(false), 10000);
    // // FIXME: MIGHT BREAK IF USER ENCOUNTERS A NEW CODE RUSH CHALLENGE OR ATTEMPT TO USE THE ITEM AGAIN
    // clearInterval(intervalRef.current); // stop immediately
    // setIsFreezed(true);
  };

  return { timer, codePatch, timeFreeze };
};

export default codePatchTimeFreeze;
