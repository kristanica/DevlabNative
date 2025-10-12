import { gameOver } from "@/assets/API/fireBase/user/Stages/gameOver";
import { useMutation } from "@tanstack/react-query";

export const useGameOver = () => {
  return useMutation({
    mutationFn: async ({
      category,
      lessonId,
      levelId,
      stageId,
    }: generalTrackerPayload) =>
      gameOver({ category, lessonId, levelId, stageId }),
  });
};
