import tryCatch from "@/assets/Hooks/function/tryCatch";
import { auth, URL } from "@/constants";
import axios from "axios";
type hintPayload = {
  description: string;
  instruction: string;
  receivedCode: any;
  submittedCode: any;
};

export const hint = async ({
  description,
  instruction,
  receivedCode,
  submittedCode,
}: hintPayload) => {
  const token = await auth?.currentUser?.getIdToken(true);

  const [data, error] = await tryCatch(
    axios.post(
      `${URL}/openAI/codeWhisper`,
      {
        description: description,
        instruction: instruction,
        recievedCode: receivedCode,
        submittedCode: submittedCode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );

  if (error) {
    throw error;
  }
  console.log(data.data);
  return data.data;
};
