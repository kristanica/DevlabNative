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
export const useHandleGameOver = () => {
  const gameOver = useGameOver();
  const resetUserHp = userHp?.getState().resetUserHp;

  const handleGameOver = async ({
    lessonId,
    category,
    stageId,
    levelId,
    setCurrentStageIndex,
  }: useHandleGameOverPayload) => {
    gameOver.mutate({
      lessonId,
      category,
      stageId,
      levelId,
    });
    resetUserHp();
    setCurrentStageIndex(0);
    return ["error", "You've ran out of lives!"];
  };
  return { handleGameOver };
};
