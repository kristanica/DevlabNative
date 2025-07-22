import { db } from "@/assets/constants/constants";
import { doc, updateDoc } from "firebase/firestore";

const setSuspended = async (uid: any, isSuspended: boolean) => {
  const userRef = doc(db, "Users", uid);
  await updateDoc(userRef, {
    suspend: !isSuspended,
  });
};

export default setSuspended;
