import { create } from "zustand";

type LevelRewardState = {
  coinsReward: number;
  expReward: number;
  setLevelReward: (coins: number, exp: number) => void;
};

export const levelRewardStore = create<LevelRewardState>((set) => ({
  coinsReward: 0,
  expReward: 0,
  setLevelReward: (coins, exp) => set({ coinsReward: coins, expReward: exp }),
}));
