import lessonPrompt from "@/assets/API/openAi/lessonPrompt";
import { useMutation } from "@tanstack/react-query";

type receivedCodePayload = {
  html?: string;
  css?: string;
  js?: string;
};

type useEvaluationPayload = {
  receivedCode: receivedCodePayload | undefined;
  instruction: string;
  description: {
    id: number;
    type: string;
    value: string;
  }[];
};

const useEvaluationLesson = () => {
  const evaluationLessonMutation = useMutation({
    mutationFn: async ({
      receivedCode,
      instruction,
      description,
    }: useEvaluationPayload) =>
      lessonPrompt({
        receivedCode,
        instruction,
        description,
      }),
  });
  return { evaluationLessonMutation };
};

export default useEvaluationLesson;
