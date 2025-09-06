import { create } from "zustand";

type payload = {
  coins: number;
  exp: number;
};
type setCoinsandExpPayload = {
  coinsAndExp: payload | null;
  setCoinsAndExp: (val: payload) => void;
};

export const setCoinsandExp = create<setCoinsandExpPayload>((set) => ({
  coinsAndExp: null,
  setCoinsAndExp: (val: payload) =>
    set({
      coinsAndExp: {
        coins: val.coins,
        exp: val.exp,
      },
    }),
}));
