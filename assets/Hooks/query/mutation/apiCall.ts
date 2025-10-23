import { bugBust } from "@/assets/API/openAi/gameModes/bugBust";
import { codeCrafter } from "@/assets/API/openAi/gameModes/codeCrafter";
import { codeRush } from "@/assets/API/openAi/gameModes/codeRush";
import { useMutation } from "@tanstack/react-query";
type codeCrafterPayload = {
  submittedCode: any;
  instruction: string;
  providedCode: any;
  description: string;
  subject: string;
  gameType: string;
  correctAnswer: string;
  userAnswer: string;
};

export const apiCall = () => {
  return useMutation({
    mutationFn: async ({
      submittedCode,
      instruction,
      providedCode,
      description,
      gameType,
      subject,
      correctAnswer,
      userAnswer,
    }: codeCrafterPayload) => {
      switch (gameType) {
        case "CodeCrafter": {
          console.log(gameType + "API CALL");
          return codeCrafter({
            submittedCode,
            instruction,
            providedCode,
            description,
            subject,
          });
        }
        case "BugBust": {
          return bugBust({
            submittedCode,
            instruction,
            providedCode,
            description,
            subject,
          });
        }
        case "CodeRush": {
          return codeRush({
            submittedCode,
            instruction,
            providedCode,
            description,
            subject,
          });
        }
        case "BrainBytes": {
          return {
            correct: correctAnswer === userAnswer,
          };
        }
        default: {
          throw new Error(`Unhandled subject type: ${subject}`);
        }
      }
    },
    onMutate: () => {},
  });
};
