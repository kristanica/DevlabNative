import unlockNextStage from "@/assets/API/fireBase/user/unlockNextStage";
import toastHandler from "@/assets/zustand/toastHandler";
import { useMutation } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { playSound } from "../../function/soundHandler";
export const unlock = (
  setCurrentStageIndex: Dispatch<SetStateAction<number>>,
  levelFinishedModal?: any,
  type?: string
) => {
  const setToastVisibility = toastHandler.getState().setToastVisibility;
  return useMutation({
    mutationKey: ["unlockNext"],
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
      }
      if (data.isNextLevelUnlocked && type === "BrainBytes") {
        levelFinishedModal.setVisibility(true);
      }
    },
    onMutate: async () => {
      await playSound("stageUnlocked");
      setToastVisibility("stageUnlocked", "You got that one right!");
    },
  });
};
