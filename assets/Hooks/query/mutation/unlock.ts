import unlockNextStage from "@/assets/API/fireBase/user/unlockNextStage";
import toastHandler from "@/assets/zustand/toastHandler";
import { useMutation } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
export const unlock = (
  setCurrentStageIndex: Dispatch<SetStateAction<number>>
) => {
  const setToastVisibility = toastHandler.getState().setToastVisibility;
  return useMutation({
    mutationFn: async ({
      category,
      lessonId,
      levelId,
      stageId,
    }: {
      category: string;
      lessonId: string;
      levelId: string;
      stageId: string;
    }) => {
      return await unlockNextStage({
        category: category,
        lessonId: lessonId,
        levelId: levelId,
        stageId: stageId,
      });
    },
    onSuccess: (data: any) => {
      if (data.isNextStageUnlocked) {
        setCurrentStageIndex((prev: number) => prev + 1);
        setToastVisibility("stageUnlocked", "You got that one right!");
      }
    },
  });
};
