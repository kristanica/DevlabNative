import { collection, doc, onSnapshot } from "firebase/firestore";
import { create } from "zustand";
import { auth, db } from "../constants/constants";
type userData = {
  username: string;
  bio: string;
  coins: number;
  exp: number;
  userLevel: number;
  suspend: boolean;
  id: string;
};

type InformationProviderProps = {
  loading: boolean;
  userData: userData | null;
  setUserData: (val: userData) => void;
  inventory: any[];
  activeBuffs: any[];
  getUser: () => Promise<void>;
};

export const useGetUserInfo = create<InformationProviderProps>((set) => ({
  loading: false,
  userData: null,
  inventory: [],
  activeBuffs: [],
  setUserData: (val: userData) => set({ userData: val }),
  getUser: async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      console.log("No user UID found");
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
              suspend: data.suspend,
              id: uid,
            },
            loading: false,
          });
          set({
            activeBuffs: data.activeBuffs,
          });
        } else {
          set({ loading: false });
          console.log("No user");
          return;
        }
      });
      const itemRef = collection(db, "Users", uid, "Inventory");
      onSnapshot(itemRef, (docSnapitem: any) => {
        if (!docSnapitem.empty) {
          const items = docSnapitem.docs.map((item: any) => ({
            id: item.id,
            ...item.data(),
          }));
          set({ inventory: items });
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
