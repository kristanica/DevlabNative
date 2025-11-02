import userHp from "@/assets/zustand/userHp";
import { SetStateAction } from "react";
import { useGameOver } from "../query/mutation/useGameOver";

type useHandleGameOverPayload = {
  setCurrentStageIndex: React.Dispatch<SetStateAction<number>>;
  lessonId: string;
  category: string;
  stageId: string;
  levelId: string;
};
export const useHandleGameOver = (gameOverModal: any) => {
  const gameOver = useGameOver();
  const resetUserHp = userHp?.getState().resetUserHp;

  const handleGameOver = async ({
    lessonId,
    category,
    stageId,
    levelId,
  }: useHandleGameOverPayload) => {
    gameOver.mutate({
      lessonId,
      category,
      stageId,
      levelId,
    });
    resetUserHp();

    setTimeout(() => gameOverModal.setVisibility(true), 50);
  };
  return { handleGameOver };
};
