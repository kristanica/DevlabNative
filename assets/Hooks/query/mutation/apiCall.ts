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
        default: {
          throw new Error(`Unhandled subject type: ${subject}`);
        }
      }
    },
  });
};
