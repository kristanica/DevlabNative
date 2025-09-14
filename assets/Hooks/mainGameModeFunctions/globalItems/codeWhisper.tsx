import { activeBuffsLocal } from "../../function/activeBuffsLocal";

const codeWhisper = (setVisibility: any) => {
  const removeActiveBuff = activeBuffsLocal.getState().removeActiveBuff;

  const codeWhisperItem = () => {
    setVisibility(true);
    removeActiveBuff("revealHint");
  };
  return { codeWhisperItem };
};

export default codeWhisper;
