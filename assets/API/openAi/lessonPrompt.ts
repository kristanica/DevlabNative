import axios from "axios";
import { auth, URL } from "../../constants/constants";

// type receivedCodePayload = {
//   html?: string;
//   css?: string;
//   js?: string;
// };

type useEvaluationPayload = {
  receivedCode: any;
  instruction: string;
  description: {
    id: number;
    type: string;
    value: string;
  }[];
  category: string;
  // description: string;
};

function* paragraphGenerator(
  blocks:
    | {
        id: number;
        type: string;
        value: string;
      }[]
    | undefined
) {
  if (!blocks) return;
  for (const block of blocks) {
    if (block.type === "Paragraph") {
      yield block.value;
    }
  }
}
function getInstructionFromBlocks(blocks: any) {
  const iterator = paragraphGenerator(blocks);
  return Array.from(iterator).join("\n"); // join paragraphs into one string
}

const lessonPrompt = async ({
  receivedCode,
  instruction,
  description,
  category,
}: useEvaluationPayload) => {
  if (!receivedCode) return null;
  const instructionText = getInstructionFromBlocks(description);
  const currentUser = auth.currentUser;
  console.log(instructionText);

  const token = await currentUser?.getIdToken(true);
  let res;
  if (category === "Database") {
    res = await axios.post(
      `${URL}/openAI/lessonPromptDb`,
      {
        sql: receivedCode,
        subject: category,
        instructions: instruction,
        description: instructionText,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } else {
    res = await axios.post(
      `${URL}/openAI/lessonPrompt`,
      {
        html: receivedCode.html,
        css: receivedCode.css,
        js: receivedCode.js,
        instructions: instruction,
        description: instructionText,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  try {
    let raw = res.data.response;
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
