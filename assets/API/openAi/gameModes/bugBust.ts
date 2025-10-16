import { auth, URL } from "@/assets/constants/constants";
import tryCatch from "@/assets/Hooks/function/tryCatch";
import axios from "axios";

type bugBustPayload = {
  submittedCode: any;
  instruction: string;
  providedCode: any;
  description: string;
  subject: string;
};
export const bugBust = async ({
  submittedCode,
  instruction,
  providedCode,
  description,
  subject,
}: bugBustPayload) => {
  const token = await auth.currentUser?.getIdToken(true);
  const [data, error] = await tryCatch(
    axios.post(
      `${URL}/openAI/bugBustPrompt`,
      {
        submittedCode: submittedCode,
        instruction: instruction,
        providedCode: providedCode,
        description: description,
        subject: subject,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );

  if (error) {
    console.log(error + "BUGBUSTaa");
    return;
  }
  let raw = data.data.response;
  if (typeof raw === "string") {
    raw = raw.replace(/```json|```/g, "").trim();
  }

  let parsed: any = null;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    console.log("Failed to parse JSON:", e, raw);
  }

  return parsed;
};
