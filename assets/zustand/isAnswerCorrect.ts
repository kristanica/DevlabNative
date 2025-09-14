import { create } from "zustand";

type isAnswerCorrectPayload = {
  isCorrect: boolean;
  setIsCorrect: (val: boolean) => void;
};

export const isAnswerCorrect = create<isAnswerCorrectPayload>((set) => ({
  isCorrect: false,
  setIsCorrect: (val: boolean) => set({ isCorrect: val }),
}));
