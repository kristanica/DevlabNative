import { create } from "zustand";

type ActiveItemIconPayload = {
  activeIcon: Record<string, boolean>;
  setActiveIcon: (val: Record<string, boolean>) => void;
};

export const ActiveItemIcon = create<ActiveItemIconPayload>((set) => ({
  activeIcon: {},
  setActiveIcon: (val) =>
    set((state) => ({
      activeIcon: { ...state.activeIcon, ...val },
    })),
}));
