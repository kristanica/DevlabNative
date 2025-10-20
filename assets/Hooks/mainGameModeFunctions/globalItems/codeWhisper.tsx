import { hint } from "@/assets/API/openAi/hint";
import { useMutation } from "@tanstack/react-query";
import { activeBuffsLocal } from "../../function/activeBuffsLocal";
type codeWhisperPayload = {
  setHintModalVisibility: (val: boolean) => void;
  description: string;
  instruction: string;
  receivedCode: any;
};
const codeWhisper = (
  setHintModalVisibility: (val: boolean) => void,
  setGeneratedHint: (val: string) => void
) => {
  const removeActiveBuff = activeBuffsLocal.getState().removeActiveBuff;
  return useMutation({
    mutationFn: async ({ description, instruction, receivedCode }: any) =>
      hint({
        description: description,
        instruction: instruction,
        receivedCode,
      }),
    onMutate: () => {
      console.log("Ran!!!!!!!!!!!!!!!");
      removeActiveBuff("revealHint");
    },
    onSuccess: (data) => {
      console.log(data.parsedResponse.whisper + "HEre!");
      setGeneratedHint(data.parsedResponse.whisper);
      setTimeout(() => {
        setHintModalVisibility(true);
      }, 200);
    },
  });
};

export default codeWhisper;
