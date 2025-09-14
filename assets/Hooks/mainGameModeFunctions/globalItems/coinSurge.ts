import { setCoinsandExp } from "@/assets/zustand/setCoinsandExp";

export const coinSurge = () => {
  const coins = setCoinsandExp((state) => state.coinsAndExp);
  const setCoins = setCoinsandExp((state) => state.setCoinsAndExp);
  const coinSurgeItem = () => {
    setCoins({
      coins: coins!.coins * 2,
      exp: coins!.exp,
    });
  };

  return { coinSurgeItem };
};
