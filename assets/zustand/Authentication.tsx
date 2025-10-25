import { onAuthStateChanged, User } from "firebase/auth";
import { create } from "zustand";
import { auth } from "../../constants";
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
    return new Promise((resolve, reject) => {
      const unsub = onAuthStateChanged(auth, (fireBaseUser) => {
        if (fireBaseUser) {
          set({ user: fireBaseUser, loaded: true });
        } else {
          set({ user: null, loaded: true });
        }
        resolve(unsub);
      });
    });
  },
}));
