import { auth, URL } from "@/assets/constants/constants";
import tryCatch from "@/assets/Hooks/function/tryCatch";
import axios from "axios";
type hintPayload = {
  description: string;
  instruction: string;
  receivedCode: any;
};

export const hint = async ({
  description,
  instruction,
  receivedCode,
}: hintPayload) => {
  const token = await auth?.currentUser?.getIdToken(true);

  const [data, error] = await tryCatch(
    axios.post(
      `${URL}/openAI/codeWhisper`,
      {
        description: description,
        instruction: instruction,
        recievedCode: receivedCode,
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
