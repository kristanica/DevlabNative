import { router } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { create } from "zustand";
import { auth } from "../../constants";

type adminAuthenticationProps = {
  user: User | null;
  loaded: boolean;
  setAdmin: (val: User) => void;
  getAdmin: () => void;
  isAdmin: boolean;
};

const adminAuthentication = create<adminAuthenticationProps>((set) => ({
  user: null,
  loaded: false,
  isAdmin: false,
  setAdmin: (val: User) => set({ user: val }),
  getAdmin: async () => {
    set({ loaded: true });
    onAuthStateChanged(auth, async (adminUser) => {
      if (!adminUser) {
        router.replace({ pathname: "/home/Home" });
        return;
      }
      const tokenResult = await adminUser.getIdTokenResult(true);
      const role = tokenResult.claims.role;

      if (role === "admin") {
        set({ user: adminUser, loaded: true, isAdmin: true });
      } else {
        router.replace({ pathname: "/home/Home" });
        return;
      }
    });
  },
}));

export default adminAuthentication;
