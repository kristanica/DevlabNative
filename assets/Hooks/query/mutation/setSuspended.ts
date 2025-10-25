import { db } from "@/constants";
import { doc, updateDoc } from "firebase/firestore";

const setSuspended = async (uid: any, isSuspended: boolean) => {
  const userRef = doc(db, "Users", uid);
  await updateDoc(userRef, {
    isSuspended: !isSuspended,
  });
};

export default setSuspended;
