import { collection, doc, onSnapshot } from "firebase/firestore";
import { create } from "zustand";
import { auth, db } from "../constants/constants";
type userData = {
  username: string;
  bio: string;
  coins: number;
  exp?: number;
  userLevel: number;
  isSuspended: boolean;
  id: string;
  profileImage: string;
  backgroundImage: string;
  lastOpenedLevel: {
    lessonId: string;
    levelId: string;
    subject: string;
    title: string;
    description: string;
  };
};
type allProgressType = Record<
  string,
  Record<
    string,
    {
      isActive: boolean;
      isRewardClaimed: boolean;
      dateUnlocked?: Date;
      isCompleted: boolean;
      completedAt?: Date;
    }
  >
>;
// Return type for stage progress
type allStagesType = Record<
  string,
  Record<
    string,
    {
      isActive: boolean;
      isCompleted: boolean;
      dateUnlocked?: Date;

      completedAt?: Date;
    }
  >
>;

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

  userAchievements: any;
  setUserAchievementProgress: any;
  getUserAchievementProgress: () => Promise<void>;
  allProgressLevels: allProgressType;
  allProgressStages: allStagesType;
  getUser: () => Promise<void>;
  completedLevels: number;
  completedStages: number;
  userUid: string;
};

export const useGetUserInfo = create<InformationProviderProps>((set) => ({
  loading: false,
  userData: null,
  inventory: [],
  userAchievements: [],
  allProgress: [],
  allProgressLevels: {},
  allProgressStages: {},
  completedLevels: 0,
  completedStages: 0,
  userUid: "",
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
  setUserAchievementProgress: (val: any) => set({ userAchievements: val }),

  getUserAchievementProgress: async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      console.log("No user UID found");
    }

    try {
      const achievmentProgressRef = collection(
        db,
        "Users",
        String(uid),
        "Achievements"
      );

      onSnapshot(achievmentProgressRef, (achievementSnapShot) => {
        if (!achievementSnapShot.empty) {
          const temp = achievementSnapShot.docs.map((achievementDoc) => ({
            id: achievementDoc.id,
            ...achievementDoc.data(),
          }));

          set({ userAchievements: temp });
        }
      });
    } catch (error) {
      console.log(error);
      return;
    }
  },
  setUserData: (val: userData) => set({ userData: val }),
  getUser: async () => {
    console.log("ASDSA");
    const uid = auth.currentUser?.uid;
    if (!uid) {
      console.log("No user UID found");
      return;
    }
    set({ userUid: String(uid) });
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
              isSuspended: data.isSuspended,
              id: uid,
              profileImage: data.profileImage,
              backgroundImage: data.backgroundImage,
              lastOpenedLevel: {
                lessonId: data?.lastOpenedLevel?.lessonId,
                levelId: data?.lastOpenedLevel?.levelId,
                subject: data?.lastOpenedLevel?.subject,
                title: data?.lastOpenedLevel?.title,
                description: data?.lastOpenedLevel?.description,
              },
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
