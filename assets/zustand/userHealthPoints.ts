import { create } from "zustand";

type userHealthPointsProps = {
  health: number;
  decrementUserHealth: () => void;
  incrementUserHealth: () => void;
  resetUserHealth: () => void;
};
export const userHealthPoints = create<userHealthPointsProps>((set) => ({
  health: 3,
  decrementUserHealth: () => set((state) => ({ health: state.health - 1 })),
  incrementUserHealth: () => set((state) => ({ health: state.health + 1 })),
  resetUserHealth: () => set({ health: 3 }),
}));
