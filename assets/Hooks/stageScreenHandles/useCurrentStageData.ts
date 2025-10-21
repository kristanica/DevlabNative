import { useStageStore } from "@/assets/zustand/useStageStore";
import { WhereIsUser } from "@/assets/zustand/WhereIsUser";
import { useEffect, useMemo, useRef, useState } from "react";

export const useCurrentStageData = (stageId: string, category: string) => {
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const stageData = useStageStore((state) => state.stageData);
  const stageLength = stageData?.[category]?.length ?? 0;
  const feedbackArray = useRef<
    { stageId: string; evaluation: string; feedback: string }[]
  >([]);
  const setLocation = WhereIsUser((state) => state.setLocation);
  const gameIdentifier = useRef<string | undefined>("Lesson");

  const currentStageData = useMemo(
    () => stageData?.[category]?.[currentStageIndex] ?? null,
    [stageData, category, currentStageIndex]
  );

  const currentStageType = currentStageData?.type ?? "Lesson";
  useEffect(() => {
    if (!currentStageData?.type) return;

    setLocation(currentStageData.type);
    console.log(currentStageData.type + "TYPE KOOOO");
    if (currentStageData.type !== "Lesson") {
      gameIdentifier.current = currentStageData.type;
    }
  }, [currentStageData, setLocation]);

  useEffect(() => {
    if (!stageData) return;

    const index: number = stageData[category].findIndex(
      (stage: any) => stage.id === stageId
    );

    setCurrentStageIndex(index);
    const stage = index !== -1 ? stageData[category][index] : null;

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
