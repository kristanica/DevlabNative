import axios from "axios";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { create } from "zustand";
import { auth, db, URL } from "../constants/constants";
type userData = {
  username: string;
  bio: string;
  coins: number;
  exp: number;
  userLevel: number;
  suspend: boolean;
  id: string;
  profileImage: string;
  backgroundImage: string;
};

type allProgressType = Record<
  string,
  Record<string, { rewardClaimed: boolean; status: boolean }>
>;

type allStagesType = Record<string, Record<string, { status: boolean }>>;

type InformationProviderProps = {
  loading: boolean;
  userData: userData | null;
  setUserData: (val: userData) => void;

  getAllProgress: () => Promise<void>;
  inventory: any[];
  allProgressLevels: allProgressType;
  allProgressStages: allStagesType;
  getUser: () => Promise<void>;
  completedLevels: number;
  completedStages: number;
};

export const useGetUserInfo = create<InformationProviderProps>((set) => ({
  loading: false,
  userData: null,
  inventory: [],
  allProgress: [],
  allProgressLevels: {},
  allProgressStages: {},
  completedLevels: 0,
  completedStages: 0,
  getAllProgress: async () => {
    const uid = await auth.currentUser?.getIdToken(true);

    try {
      const res = await axios.get(`${URL}/fireBase/userProgress`, {
        headers: {
          Authorization: `Bearer ${uid}`,
        },
      });
      if (res.status !== 200) {
        console.log(res.status);
      }
      set({ allProgressLevels: res.data?.allProgress });
      set({ allProgressStages: res.data?.allStages });
      set({ completedLevels: res.data?.completedLevels });
      set({ completedStages: res.data?.completedStages });
    } catch (error) {
      console.log(error);
    }
  },
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
              profileImage: data.profileImage,
              backgroundImage: data.backgroundImage,
            },
            loading: false,
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
