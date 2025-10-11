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
      `${URL}/openAI/bugBust`,
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
  return data.data;
};
