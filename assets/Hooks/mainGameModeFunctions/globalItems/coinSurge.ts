import { levelRewardStore } from "@/assets/zustand/levelRewardStore";

export const coinSurge = () => {
  const setLevelReward = levelRewardStore((state) => state.setLevelReward);

  const levelCoinsReward = levelRewardStore((state) => state.coinsReward);
  const levelExpReward = levelRewardStore((state) => state.expReward);

  const coinSurgeItem = () => {
    setLevelReward(levelCoinsReward * 2, levelExpReward);
  };
  return { coinSurgeItem };
};
