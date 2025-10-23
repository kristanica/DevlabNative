import { create } from "zustand";

type isEvaluatingPayload = {
  isEvaluating: boolean;
  setIsEvaluating: (val: boolean) => void;
};

export const isEvaluatingStore = create<isEvaluatingPayload>((set) => ({
  isEvaluating: false,
  setIsEvaluating: (val: boolean) => set({ isEvaluating: val }),
}));
