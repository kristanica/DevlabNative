import { router } from "expo-router";
import { Dispatch, SetStateAction, useCallback } from "react";
import { InteractionManager } from "react-native";

export const useStageNavigation = (
  setCurrentStageIndex: Dispatch<SetStateAction<number>>,
  currentStageIndex: number,
  islevelCompleted: boolean,
  stageLength: number,
  setFinalAsnwerVisibility: (val: boolean) => void,
  setFinishedModalVisibility: (val: boolean) => void
) => {
  const handlePrevious = useCallback(() => {
    setCurrentStageIndex((prev) => {
      if (prev <= 0) {
        console.log("last stage");
        return prev;
      }
      const newIndex = prev - 1;
      console.log("UPDATED INDEX:", newIndex);
      return newIndex;
    });
  }, []);
  const handleBackPress = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      router.replace({ pathname: "/home/Home" });
    });
  }, [currentStageIndex]);

  const handleNext = useCallback(() => {
    setCurrentStageIndex((prev: number) => {
      if (islevelCompleted) {
        if (prev < stageLength - 1) {
          return prev + 1;
        } else {
          setFinishedModalVisibility(true);
          return prev;
        }
      }
      setFinalAsnwerVisibility(true);
      return prev;
    });
  }, []);

  return {
    handlePrevious,
    handleBackPress,
    handleNext,
  };
};
