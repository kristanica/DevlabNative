import gamePrompt from "@/assets/API/openAi/gamePrompt";
import { useMutation } from "@tanstack/react-query";

type receivedCodePayload = {
  html?: string;
  css?: string;
  js?: string;
};

type useEvaluationPayload = {
  receivedCode: receivedCodePayload | undefined;
  instruction: string;
  description: string;
};
const useEvaluation = () => {
  const evaluationMutation = useMutation({
    mutationFn: async ({
      receivedCode,
      instruction,
      description,
    }: useEvaluationPayload) =>
      gamePrompt({
        receivedCode,
        instruction,
        description,
      }),
  });

  return { evaluationMutation };
};

export default useEvaluation;
