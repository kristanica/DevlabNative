import { collection, doc, onSnapshot } from "firebase/firestore";
import { create } from "zustand";
import { auth, db } from "../../constants";
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
  lastOpenedLevel: any;
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
  getUserAchievementProgress: () => Promise<any>;
  allProgressLevels: allProgressType;
  allProgressStages: allStagesType;
  getUser: () => Promise<any>;
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

      const unsubAchievement = onSnapshot(
        achievmentProgressRef,
        (achievementSnapShot) => {
          if (!achievementSnapShot.empty) {
            const temp = achievementSnapShot.docs.map((achievementDoc) => ({
              id: achievementDoc.id,
              ...achievementDoc.data(),
            }));

            set({ userAchievements: temp });
          }
        }
      );
      return unsubAchievement;
    } catch (error) {
      console.log(error);
      return;
    }
  },
  setUserData: (val: userData) => set({ userData: val }),
  getUser: async () => {
    return new Promise<() => void | undefined>((resolve, reject) => {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        console.log("No user UID found");
        return resolve(undefined!);
      }

      set({ userUid: String(uid), loading: true });

      try {
        const userRef = doc(db, "Users", uid);

        let unsubUserInfo: () => void;
        let unsubInventory: () => void;
        unsubUserInfo = onSnapshot(
          userRef,
          (docSnap: any) => {
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
                  lastOpenedLevel: data.lastOpenedLevel,
                },
                loading: false,
              });

              resolve(() => {
                unsubUserInfo();
                unsubInventory();
              });
            } else {
              set({ loading: false });
              console.log("No user");
              resolve(undefined!);
            }
          },
          (error) => {
            console.log("Error in user snapshot:", error);
            set({ loading: false });
            reject(error);
          }
        );

        const itemRef = collection(db, "Users", uid, "Inventory");
        unsubInventory = onSnapshot(itemRef, (docSnapitem: any) => {
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
        set({ loading: false });
        reject(error);
      }
    });
  },
}));
