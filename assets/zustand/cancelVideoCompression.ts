import { create } from "zustand";

type cancelCompressionProps = {
  isCanceled: boolean;
  setCancelCompression: (val: boolean) => void;
};

export const cancelVideoCompression = create<cancelCompressionProps>((set) => ({
  isCanceled: false,
  setCancelCompression: (val: boolean) => set({ isCanceled: val }),
}));
