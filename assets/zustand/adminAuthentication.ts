import { router } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { auth, db } from "../constants/constants";

type adminAuthenticationProps = {
  user: User | null;
  loaded: boolean;
  setAdmin: (val: User) => void;
  getAdmin: () => void;
};

const adminAuthentication = create<adminAuthenticationProps>((set) => ({
  user: null,
  loaded: false,
  setAdmin: (val: User) => set({ user: val }),
  getAdmin: async () => {
    set({ loaded: false });
    onAuthStateChanged(auth, async (adminUser) => {
      if (!adminUser) {
        router.replace({ pathname: "/(user)/home/Settings" });
        return;
      }
      const uid = adminUser.uid;
      const adminRef = doc(db, "Users", uid);
      const adminDoc = await getDoc(adminRef);

      if (adminDoc.data()?.isAdmin && adminDoc.exists()) {
        set({ user: adminUser, loaded: true });
        return;
      } else {
        router.replace({ pathname: "/(user)/home/Settings" });
        return;
      }
    });
  },
}));

export default adminAuthentication;
