import { create } from "zustand";
type useBrainBytesStorePayload = {
  userAnswer: string;
  correctAnswer: string;
  setCorrectAnswer: (val: string) => void;
  setUserAnswer: (val: string) => void;
};

export const useBrainBytesStore = create<useBrainBytesStorePayload>((set) => ({
  userAnswer: "",
  correctAnswer: "",
  setCorrectAnswer: (val: string) => set({ correctAnswer: val }),
  setUserAnswer: (val: string) => set({ userAnswer: val }),
}));
