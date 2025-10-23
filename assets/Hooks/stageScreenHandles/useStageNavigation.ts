import { router } from "expo-router";
import { Dispatch, SetStateAction, useCallback } from "react";
import { InteractionManager } from "react-native";

export const useStageNavigation = (
  setCurrentStageIndex: Dispatch<SetStateAction<number>>,
  currentStageIndex: number,
  islevelCompleted: boolean,
  stageLength: number,
  setFinalAsnwerVisibility: (val: boolean) => void,
  setFinishedModalVisibility: (val: boolean) => void,
  isStageAlreadyCompleted: boolean
) => {
  //Handles the previous button

  const handlePrevious = useCallback(() => {
    setCurrentStageIndex((prev) => {
      // Checks if on there are no more pages to prev
      if (prev <= 0) {
        console.log("LAST STAGE");
        return prev;
      }
      // Actual prev
      const newIndex = prev - 1;
      console.log("UPDATED INDEX:", newIndex);
      return newIndex;
    });
  }, []);
  // Back button
  const handleBackPress = useCallback(() => {
    // Emsure all the interactions are made before nagivating back
    InteractionManager.runAfterInteractions(() => {
      router.replace({ pathname: "/home/Home" });
    });
  }, [currentStageIndex]);

  const handleNext = useCallback(() => {
    setCurrentStageIndex((prev: number) => {
      // If level is completed, skips the loading
      if (isStageAlreadyCompleted) {
        if (prev < stageLength - 1) {
          return prev + 1;
        } else {
          // When level is finished, modal will show
          setFinishedModalVisibility(true);
          return prev;
        }
      }
      //The user has not completed the level yet, hence the final answer modal will show.
      setFinalAsnwerVisibility(true);
      return prev;
    });
  }, [
    isStageAlreadyCompleted,
    stageLength,
    setFinishedModalVisibility,
    setFinalAsnwerVisibility,
  ]);

  return {
    handlePrevious,
    handleBackPress,
    handleNext,
  };
};
