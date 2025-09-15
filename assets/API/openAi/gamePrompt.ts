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
    if (typeof res.data === "object") {
      if (typeof res.data.response === "string") {
        parse = JSON.parse(res.data.response);
      }
    }
    console.log(parse);
    return parse;
  } catch (error) {
    console.log(error);
  }
};

export default gamePrompt;
