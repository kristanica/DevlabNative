import { onAuthStateChanged, User } from "firebase/auth";
import { create } from "zustand";
import { auth } from "../constants/constants";
type ProtectedProps = {
  user: User | null;
  loaded: boolean;
  setValidUser: (val: User) => void;
  getValidUser: () => void;
};

export const Protected = create<ProtectedProps>((set) => ({
  user: null,
  loaded: false,
  setValidUser: (val: User) => set({ user: val }),
  getValidUser: () => {
    set({ loaded: false });
    const unsub = onAuthStateChanged(auth, (fireBaseUser) => {
      set({ user: fireBaseUser, loaded: true });
    });
    return unsub;
  },
}));
