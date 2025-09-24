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

  setUserProgress: (data: {
    allProgressLevels: allProgressType;
    allProgressStages: allStagesType;
    completedLevels: number;
    completedStages: number;
  }) => void;
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
  setUserProgress: ({
    allProgressLevels,
    allProgressStages,
    completedLevels,
    completedStages,
  }) => {
    set({
      allProgressLevels,
      allProgressStages,
      completedLevels,
      completedStages,
    });
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
