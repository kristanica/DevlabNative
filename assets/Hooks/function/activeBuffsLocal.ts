import { create } from "zustand";

type localBuffsPayload = {
  activeBuff: any[];

  addActiveBuff: (itemName: string) => void;
  removeActiveBuff: (itemName: string) => void;
};

export const activeBuffsLocal = create<localBuffsPayload>((set) => ({
  activeBuff: [],
  addActiveBuff: (itemName: string) =>
    set((state) => {
      if (!state.activeBuff.includes(itemName)) {
        return { activeBuff: [...state.activeBuff, itemName] };
      }
      return {};
    }),
  removeActiveBuff: (itemName: string) =>
    set((state) => {
      if (state.activeBuff.includes(itemName)) {
        const newBuffs = state.activeBuff.filter(
          (activeItems: string) => activeItems !== itemName
        );
        return { activeBuff: [...newBuffs] };
      }
      return {};
    }),
}));
