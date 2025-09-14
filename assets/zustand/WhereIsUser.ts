import { create } from "zustand";

type WhereIsUserProps = {
  location: string | undefined;
  setLocation: (val: any) => void;
};

export const WhereIsUser = create<WhereIsUserProps>((set) => ({
  location: undefined,
  setLocation: (val: any) => set({ location: val }),
}));
