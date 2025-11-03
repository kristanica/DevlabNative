import { create } from "zustand";
type userHpPayload = {
  userHp: number;

  decrementUserHp: () => void;
  resetUserHp: () => void;
  incrementUserHp: () => void;
};

const userHp = create<userHpPayload>((set) => ({
  userHp: 3,

  decrementUserHp: () =>
    set((state) => ({
      userHp: state.userHp > 0 ? state.userHp - 1 : 0,
    })),
  resetUserHp: () => set({ userHp: 3 }),
  incrementUserHp: () =>
    set((state) => ({
      userHp: state.userHp + 1,
    })),
}));

export default userHp;
