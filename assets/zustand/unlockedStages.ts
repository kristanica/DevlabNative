import { create } from "zustand";

type unlockedStagesPayload = {
  unlockedStages: any;
  setUnlockedStages: (val: any) => void;
};

export const unlockedStages = create<unlockedStagesPayload>((set) => ({
  unlockedStages: {},
  setUnlockedStages: (val: any) => set({ unlockedStages: val }),
}));
