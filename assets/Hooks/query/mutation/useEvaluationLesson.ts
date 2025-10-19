import lessonPrompt from "@/assets/API/openAi/lessonPrompt";
import { useMutation } from "@tanstack/react-query";

// type receivedCodePayload =
//   | {
//       html?: string;
//       css?: string;
//       js?: string;
//     }
//   | string;

type useEvaluationPayload = {
  category: string;
  receivedCode: any;
  instruction: string;
  // description: string;
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
      category,
    }: useEvaluationPayload) => {
      return lessonPrompt({
        receivedCode,
        instruction,
        description,
        category,
      });
    },
  });
  return { evaluationLessonMutation };
};

export default useEvaluationLesson;
