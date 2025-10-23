import { create } from "zustand";

type localBuffsPayload = {
  activeBuff: any[];

  addActiveBuff: (itemName: string) => void;
  removeActiveBuff: (itemName: string) => void;
  clearActiveBuff: () => void;
};

export const activeBuffsLocal = create<localBuffsPayload>((set) => ({
  activeBuff: [],
  addActiveBuff: (itemName: string) =>
    set((state) => {
      if (!state.activeBuff.includes(itemName)) {
        return { activeBuff: [...state.activeBuff, itemName] };
      }
      console.log("You cannot use this item again!");
      return state;
    }),
  removeActiveBuff: (itemName: string) =>
    set((state) => {
      if (state.activeBuff.includes(itemName)) {
        const newBuffs = state.activeBuff.filter(
          (activeItems: string) => activeItems !== itemName
        );
        return { activeBuff: [...newBuffs] };
      }
      return state;
    }),
  clearActiveBuff: () =>
    set({
      activeBuff: [],
    }),
}));
