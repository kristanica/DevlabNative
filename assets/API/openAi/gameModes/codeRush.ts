import { auth, URL } from "@/assets/constants/constants";
import tryCatch from "@/assets/Hooks/function/tryCatch";
import axios from "axios";

type codeRushPayload = {
  submittedCode: any;
  instruction: string;
  providedCode: any;
  description: string;
  subject: string;
};

export const codeRush = async ({
  submittedCode,
  instruction,
  providedCode,
  description,
  subject,
}: codeRushPayload) => {
  const token = await auth.currentUser?.getIdToken(true);

  const [data, error] = await tryCatch(
    axios.post(
      `${URL}/openAI/codeRush`,
      {
        SUBMITTEDCODE: submittedCode,
        INSTRUCTION: instruction,
        PROVIDEDCODE: providedCode,
        DESCRIPTION: description,
        SUBJECT: subject,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );
  if (error) {
    console.log(error + "CODECRAFTER");
    return;
  }
  return data.data;
};
