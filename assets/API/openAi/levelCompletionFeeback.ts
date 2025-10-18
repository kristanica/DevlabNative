import { auth, URL } from "@/assets/constants/constants";
import tryCatch from "@/assets/Hooks/function/tryCatch";
import axios from "axios";

export const levelCompletionFeedback = async (stageResult: any) => {
  const token = await auth.currentUser?.getIdToken(true);
  const [data, error] = await tryCatch(
    axios.post(
      `${URL}/openAI/feedbackPrompts`,
      {
        stageFeedbacks: stageResult,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );
  if (error) {
    console.log(`${error} levelCOmpletionFeedback`);
    throw error;
  }
  let raw = data!.data.response;
  if (typeof raw === "string") {
    raw = raw.replace(/```json|```/g, "").trim();
  } else {
    return raw;
  }

  let parsed: any = null;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    console.log("Failed to parse JSON:", e, raw);
  }
  console.log(parsed);
  return parsed;
};
