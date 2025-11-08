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
  const incrementHp = userHp?.getState().incrementUserHp;

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
    //Resets the user health to 3
    resetUserHp();
    //For some reason nag rreset lang sa 2 so  need this to make it 3
    incrementHp();

    setTimeout(() => gameOverModal.setVisibility(true), 50);
  };
  return { handleGameOver };
};
