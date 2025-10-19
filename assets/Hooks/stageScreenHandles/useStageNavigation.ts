import { router } from "expo-router";
import { Dispatch, SetStateAction, useCallback } from "react";
import { InteractionManager } from "react-native";

export const useStageNavigation = (
  setCurrentStageIndex: Dispatch<SetStateAction<number>>,
  currentStageIndex: number
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

  return {
    handlePrevious,
    handleBackPress,
  };
};
