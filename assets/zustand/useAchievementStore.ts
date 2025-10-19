import { create } from "zustand";

type AchievementStorePayload = {
  achievementStore: Record<string, any[]>;
  setAchievementStore: (category: string, data: any[]) => void;
};

export const useAchievementStore = create<AchievementStorePayload>((set) => ({
  achievementStore: {},
  setAchievementStore: (category: string, data: any[]) =>
    set((state) => ({
      achievementStore: {
        ...state.achievementStore,
        [category]: data,
      },
    })),
}));
