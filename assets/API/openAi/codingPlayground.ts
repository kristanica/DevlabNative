import { auth, URL } from "@/assets/constants/constants";
import tryCatch from "@/assets/Hooks/function/tryCatch";
import axios from "axios";

export const codingPlayground = async ({ receivedCode }: any) => {
  const token = await auth?.currentUser?.getIdToken(true);
  const [playgroundRes, error] = await tryCatch(
    axios.post(
      `${URL}/openAI/codePlaygroundEval`,
      {
        css: receivedCode?.css,
        js: receivedCode?.js,
        html: receivedCode?.html,
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
