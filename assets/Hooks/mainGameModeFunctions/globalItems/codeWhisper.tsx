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
  setGeneratedHint: (val: string) => void,
  setHintLoading: (val: boolean) => void
) => {
  // Imddtly removes the item on activeBuffs array once used.
  const removeActiveBuff = activeBuffsLocal.getState().removeActiveBuff;
  return useMutation({
    mutationFn: async ({ description, instruction, receivedCode }: any) =>
      hint({
        description: description,
        instruction: instruction,
        receivedCode,
      }),
    // On button pressed, this will run
    onMutate: () => {
      setHintLoading(true);
      removeActiveBuff("revealHint");
    },
    // When success, this will run, stores the data on the useState then set loading as false
    onSuccess: (data) => {
      setHintLoading(false);
      setGeneratedHint(data.parsedResponse.whisper);
      setTimeout(() => {
        setHintModalVisibility(true);
      }, 200);
    },
  });
};

export default codeWhisper;
