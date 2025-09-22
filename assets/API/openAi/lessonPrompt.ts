import axios from "axios";
import { auth, URL } from "../../constants/constants";

type receivedCodePayload = {
  html?: string;
  css?: string;
  js?: string;
};

type useEvaluationPayload = {
  receivedCode: receivedCodePayload | undefined;
  instruction: string;
  description: string;
};
const lessonPrompt = async ({
  receivedCode,
  instruction,
  description,
}: useEvaluationPayload) => {
  if (!receivedCode) return null;

  const currentUser = auth.currentUser;

  const token = await currentUser?.getIdToken(true);

  try {
    const res = await axios.post(
      `${URL}/openAI/lessonPrompt`,
      {
        html: receivedCode.html,
        css: receivedCode.css,
        js: receivedCode.js,
        instructions: instruction,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let raw = res.data.response;

    // 🧹 Clean response if wrapped in ```json ... ```
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
  } catch (error) {
    console.log(error);
  }
};

export default lessonPrompt;
