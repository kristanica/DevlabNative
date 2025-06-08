import { FIREBASE_AUTH } from "@/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type authRouteProps = {
  user: User | null;
  loaded: boolean;
};

const authRoute = createContext<authRouteProps | undefined>(undefined);
type childrenShit = {
  children: ReactNode;
};

export const AuthChecker = ({ children }: childrenShit) => {
  const auth = FIREBASE_AUTH;

  const [user, setUser] = useState<User | null>(null);
  const [loaded, isLoaded] = useState<boolean>(false);

  useEffect(() => {
    const user = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      isLoaded(true);
    });
    return user;
  }, []);

  return (
    <authRoute.Provider value={{ user, loaded }}>{children}</authRoute.Provider>
  );
};

export const useAuth = (): authRouteProps => {
  const useAuth = useContext(authRoute);

  if (!useAuth) {
    throw new Error("null");
  }
  return useAuth;
};
