import stageStore from "@/assets/zustand/stageStore";
import { WhereIsUser } from "@/assets/zustand/WhereIsUser";
import { useEffect, useMemo, useRef, useState } from "react";
import { InteractionManager } from "react-native";

export const useCurrentStageData = (stageId: string) => {
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const stageData = stageStore((state) => state.stageData);
  const [stageLength] = useState<number>(stageData.length);
  const feedbackArray = useRef<
    { stageId: string; evaluation: string; feedback: string }[]
  >([]);
  const setLocation = WhereIsUser((state) => state.setLocation);
  const gameIdentifier = useRef<string | undefined>("Lesson");

  const currentStageData = useMemo(
    () => stageData?.[currentStageIndex] ?? null,
    [stageData, currentStageIndex]
  );

  const currentStageType = currentStageData?.type ?? "Lesson";
  useEffect(() => {
    if (!currentStageData?.type) return;

    InteractionManager.runAfterInteractions(() => {
      setLocation(currentStageData.type);

      if (currentStageData.type !== "Lesson") {
        gameIdentifier.current = currentStageData.type;
      }
    });
  }, [currentStageData, setLocation]);

  useEffect(() => {
    if (!stageData) return;

    const index: number = stageData.findIndex(
      (stage: any) => stage.id === stageId
    );

    setCurrentStageIndex(index);
    const stage = index !== -1 ? stageData[index] : null;

    if (stage?.type) {
      setLocation(stage.type as string);
    }
    if (stage?.type !== "Lesson") {
      gameIdentifier.current = stage?.type;
      console.log(gameIdentifier.current);
    }
  }, [stageId, stageData, setLocation]);

  return {
    currentStageIndex,
    setCurrentStageIndex,
    currentStageData,
    stageData,
    currentStageType,
    gameIdentifier,
    feedbackArray,
    stageLength,
  };
};
