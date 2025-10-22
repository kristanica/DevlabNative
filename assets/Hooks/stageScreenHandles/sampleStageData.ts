// @refresh reset
import { WhereIsUser } from "@/assets/zustand/WhereIsUser";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";

export const sampleStageData = (
  category: string,
  lessonId: string,
  levelId: string,
  stageId: string
) => {
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(-1);
  const feedbackArray = useRef<
    { stageId: string; evaluation: string; feedback: string }[]
  >([]);
  const setLocation = WhereIsUser((state) => state.setLocation);
  const gameIdentifier = useRef<string | undefined>("Lesson");
  const queryClient = useQueryClient();
  const content = useMemo(
    () =>
      queryClient.getQueryData<any[]>(["getAllData", String(category)]) ?? [],
    [category, queryClient]
  );

  const getLessonData = useMemo(
    () => content.find((lesson: any) => lesson.id === lessonId),
    [content, lessonId]
  );
  const getLevelData = useMemo(
    () => getLessonData?.levels.find((level: any) => level.id === levelId),
    [getLessonData, levelId]
  );
  const getStageData = useMemo(
    () => getLevelData?.stages ?? [],
    [getLevelData]
  );

  useEffect(() => {
    if (!getStageData) return;
    const index = getStageData?.findIndex((stage: any) => stage.id === stageId);
    if (index === -1) {
      console.warn(`Stage ${stageId} not found in category ${category}`);
      setCurrentStageIndex(0);
    } else {
      setCurrentStageIndex(index);
    }
  }, [getStageData, stageId, category]);
  const currentStageData = useMemo(() => {
    if (
      currentStageIndex === -1 ||
      !getStageData ||
      getStageData.length === 0
    ) {
      return null;
    }
    return getStageData[currentStageIndex] ?? null;
  }, [currentStageIndex, getStageData]);

  const currentStageType = currentStageData?.type ?? "Lesson";
  useEffect(() => {
    if (!currentStageData?.type) return;

    setLocation(currentStageData.type);
    currentStageData;
    if (currentStageData.type !== "Lesson") {
      gameIdentifier.current = currentStageData.type;
      console.log("Game identifier:", gameIdentifier.current);
    }
  }, [currentStageData, setLocation]);
  const stageLength = getStageData.length ?? 0;
  return {
    currentStageIndex,
    setCurrentStageIndex,
    currentStageData,
    currentStageType,
    gameIdentifier,
    feedbackArray,
    stageLength,
  };
};
