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

  userAchievements: any[];
  setUserAchievementProgress: (val: any[]) => void;
  getUserAchievementProgress: () => Promise<void>;
  allProgressLevels: allProgressType;
  allProgressStages: allStagesType;
  getUser: () => Promise<(() => void) | undefined>;
  completedLevels: number;
  completedStages: number;
  userUid: string;
};

export const useGetUserInfo = create<InformationProviderProps>((set, get) => {
  let unsubUserInfo: (() => void) | null = null;
  let unsubInventory: (() => void) | null = null;
  let unsubAchievements: (() => void) | null = null;

  return {
    loading: false,
    userData: null,
    inventory: [],
    userAchievements: [],
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

    setUserAchievementProgress: (val) => set({ userAchievements: val }),

    getUserAchievementProgress: async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      unsubAchievements?.();

      const achievmentProgressRef = collection(
        db,
        "Users",
        uid,
        "Achievements"
      );
      unsubAchievements = onSnapshot(achievmentProgressRef, (snapshot) => {
        const achievements = snapshot.empty
          ? []
          : snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        set({ userAchievements: achievements });
      });
    },

    setUserData: (val) => set({ userData: val }),

    getUser: async () => {
      return new Promise<(() => void) | undefined>(async (resolve, reject) => {
        const uid = auth.currentUser?.uid;
        if (!uid) return resolve(undefined);

        // 1️⃣ Unsubscribe previous listeners
        unsubUserInfo?.();
        unsubInventory?.();
        unsubAchievements?.();

        // 2️⃣ Reset state immediately for new user
        set({
          loading: true,
          userData: null,
          inventory: [],
          userAchievements: [],
          allProgressLevels: {},
          allProgressStages: {},
          completedLevels: 0,
          completedStages: 0,
          userUid: uid,
        });

        try {
          // User info
          const userRef = doc(db, "Users", uid);
          unsubUserInfo = onSnapshot(
            userRef,
            (docSnap: any) => {
              if (!docSnap.exists()) return;

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

              // Resolve cleanup function once user loaded
              resolve(() => {
                unsubUserInfo?.();
                unsubInventory?.();
                unsubAchievements?.();
              });
            },
            (error) => {
              console.log("User snapshot error:", error);
              set({ loading: false });
              reject(error);
            }
          );

          // Inventory listener
          const itemRef = collection(db, "Users", uid, "Inventory");
          unsubInventory = onSnapshot(itemRef, (snapshot: any) => {
            const items = snapshot.empty
              ? []
              : snapshot.docs.map((doc: any) => ({
                  id: doc.id,
                  ...doc.data(),
                }));
            set({ inventory: items });
          });

          // Achievements
          await get().getUserAchievementProgress();
        } catch (error) {
          console.log("getUser error:", error);
          set({ loading: false });
          reject(error);
        }
      });
    },
  };
});
