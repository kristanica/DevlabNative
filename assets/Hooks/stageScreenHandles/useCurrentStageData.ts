import { useStageStore } from "@/assets/zustand/useStageStore";
import { WhereIsUser } from "@/assets/zustand/WhereIsUser";
import { useEffect, useMemo, useRef, useState } from "react";

export const useCurrentStageData = (stageId: string, category: string) => {
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(-1); // ✅ Start with -1
  const stageData = useStageStore((state) => state.stageData);
  const stageLength = stageData?.[category]?.length ?? 0;
  const feedbackArray = useRef<
    { stageId: string; evaluation: string; feedback: string }[]
  >([]);
  const setLocation = WhereIsUser((state) => state.setLocation);
  const gameIdentifier = useRef<string | undefined>("Lesson");

  // ✅ Find the index first, before computing currentStageData
  useEffect(() => {
    if (!stageData?.[category]) {
      console.log("Stage data not available for category:", category);
      return;
    }

    const index = stageData[category].findIndex(
      (stage: any) => stage.id === stageId
    );

    if (index === -1) {
      console.warn(`Stage ${stageId} not found in category ${category}`);
      setCurrentStageIndex(0); // Fallback to first stage
    } else {
      setCurrentStageIndex(index);
    }
  }, [stageId, stageData, category]);

  // ✅ Now compute currentStageData - it will be null until index is set
  const currentStageData = useMemo(() => {
    if (currentStageIndex === -1 || !stageData?.[category]) {
      return null;
    }
    return stageData[category][currentStageIndex] ?? null;
  }, [stageData, category, currentStageIndex]);

  const currentStageType = currentStageData?.type ?? "Lesson";

  // ✅ Set location and game identifier when data is available
  useEffect(() => {
    if (!currentStageData?.type) return;

    setLocation(currentStageData.type);
    console.log(currentStageData.type + " TYPE KOOOO");

    if (currentStageData.type !== "Lesson") {
      gameIdentifier.current = currentStageData.type;
      console.log("Game identifier:", gameIdentifier.current);
    }
  }, [currentStageData, setLocation]);

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
