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
const gamePrompt = async ({
  receivedCode,
  instruction,
  description,
}: useEvaluationPayload) => {
  if (!receivedCode) return null;

  const currentUser = auth.currentUser;

  const token = await currentUser?.getIdToken(true);
  console.log(token);
  try {
    const res = await axios.post(
      `${URL}/openAI/gamePrompt`,
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

    if (res.status !== 200) {
      console.log("Something went wrong");
      return;
    }

    let parse: any = null;
    if (typeof res.data.response === "string") {
      const clean = res.data.response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      try {
        parse = JSON.parse(clean);
      } catch (err) {
        console.error("Still invalid JSON:", clean);
      }
    }
    return parse;
  } catch (error) {
    console.log("CLient error" + error);
  }
};

export default gamePrompt;
