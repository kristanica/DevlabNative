import { levelCompletionFeedback } from "@/assets/API/openAi/levelCompletionFeeback";
import { useMutation } from "@tanstack/react-query";

export const makeLevelFeedback = () => {
  return useMutation({
    mutationFn: async (stageResult: any) =>
      levelCompletionFeedback(stageResult),
  });
};
