import { doc, increment, onSnapshot, updateDoc } from "firebase/firestore";
import { create } from "zustand";
import { auth, db } from "../constants/constants";
type userHpPayload = {
  userHp: number;
  loadUserHp: () => void;
  decrementUserHp: () => void;
  resetUserHp: () => void;
};

const getRef = async () => {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    throw new Error("User UID is undefined");
  }
  const ref = doc(db, "Users", uid);
  return ref;
};

const userHp = create<userHpPayload>((set) => ({
  userHp: 0,
  loadUserHp: async () => {
    const userRef = await getRef();

    const unsub = onSnapshot(userRef, (data) => {
      const healthSnapShot = data.data()?.healthPoints;

      if (healthSnapShot) {
        set({ userHp: healthSnapShot });
      }
    });

    return unsub;
  },
  decrementUserHp: async () => {
    const userRef = await getRef();
    await updateDoc(userRef, { healthPoints: increment(-1) });
  },
  resetUserHp: async () => {
    const userRef = await getRef();
    await updateDoc(userRef, { healthPoints: 3 });
  },
}));

export default userHp;
