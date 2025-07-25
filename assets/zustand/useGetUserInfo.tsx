import { doc, onSnapshot } from "firebase/firestore";
import { create } from "zustand";
import { auth, db } from "../constants/constants";
type userData = {
  username: string;
  bio: string;
  coins: number;
  exp: number;
  userLevel: number;
};

type InformationProviderProps = {
  loading: boolean;
  userData: userData | null;
  setUserData: (val: userData) => void;
  getUser: () => Promise<void>;
};

export const useGetUserInfo = create<InformationProviderProps>((set) => ({
  loading: false,
  userData: null,
  setUserData: (val: userData) => set({ userData: val }),
  getUser: async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      console.log("No user UID found.");
      return;
    }
    try {
      set({ loading: true });
      const userRef = doc(db, "Users", uid);
      onSnapshot(userRef, (docSnap: any) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          set({
            userData: {
              username: data.username,
              bio: data.bio,
              coins: data.coins,
              exp: data.exp,
              userLevel: data.userLevel,
            },
            loading: false,
          });
        } else {
          set({ loading: false });
          console.log("No user");
          return;
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
