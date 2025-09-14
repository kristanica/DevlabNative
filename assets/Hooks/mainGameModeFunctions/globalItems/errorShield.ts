import { activeBuffsLocal } from "../../function/activeBuffsLocal";

const errorShield = () => {
  const removeActiveBuffs = activeBuffsLocal.getState().removeActiveBuff;
  const activeBuffs = activeBuffsLocal.getState().activeBuff;

  const hasShield = activeBuffs.includes("errorShield");
  const consumeErrorShield = async () => {
    if (!hasShield) return false;

    try {
      removeActiveBuffs("errorShield");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return { hasShield, consumeErrorShield };
};
export default errorShield;
