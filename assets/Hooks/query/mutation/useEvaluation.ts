import { auth } from "@/assets/constants/constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type recievedCodePayload = {
  html?: string;
  css?: string;
  js?: string;
};

type useEvaluationPayload = {
  recievedCode: recievedCodePayload | undefined;
  instruction: string;
  description: string;
};
const useEvaluation = () => {
  const evaluationMutation = useMutation({
    mutationFn: async ({
      recievedCode,
      instruction,
      description,
    }: useEvaluationPayload) => {
      if (!recievedCode) return null;

      const currentUser = auth.currentUser;

      const token = await currentUser?.getIdToken(true);
      console.log(token);
      try {
        const res = await axios.post(
          `https://dabe3ff30004.ngrok-free.app/openAI/mainPrompt`,
          {
            html: recievedCode.html,
            css: recievedCode.css,
            js: recievedCode.js,
            instructions: instruction,
            description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status !== 200) {
          console.log("Something went wrong");
          return;
        }

        let parse: any = null;
        if (typeof res.data === "object") {
          if (typeof res.data.response === "string") {
            parse = JSON.parse(res.data.response);
          }
        }

        return parse;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return { evaluationMutation };
};

export default useEvaluation;
