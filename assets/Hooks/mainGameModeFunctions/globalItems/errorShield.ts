import { auth, db } from "@/assets/constants/constants";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";

const errorShield = () => {
  const activeBuffs = useGetUserInfo.getState().activeBuffs;
  const hasShield = activeBuffs.includes("errorShield");
  const consumeErrorShield = async () => {
    if (!hasShield) return false;

    try {
      const userRef = doc(db, "Users", String(auth.currentUser?.uid));
      await updateDoc(userRef, { activeBuffs: arrayRemove("errorShield") });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return { hasShield, consumeErrorShield };
};
export default errorShield;
