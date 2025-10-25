import tryCatch from "@/assets/Hooks/function/tryCatch";
import { auth, URL } from "@/constants";
import axios from "axios";

export const databasePlayground = async ({ receivedCode }: any) => {
  const token = await auth?.currentUser?.getIdToken(true);

  const [playgroundRes, error] = await tryCatch(
    axios.post(
      `${URL}/openAI/databasePlaygroundEval`,
      {
        sql: receivedCode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );
  if (error) {
    console.log(error);
    return;
  }
  let raw = playgroundRes.data.response;
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
