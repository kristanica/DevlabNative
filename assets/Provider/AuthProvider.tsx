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

const authRouteContext = createContext<authRouteProps | undefined>(undefined);
type childrenProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: childrenProps) => {
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
    <authRouteContext.Provider value={{ user, loaded }}>
      {children}
    </authRouteContext.Provider>
  );
};

export const useAuth = () => {
  const useAuth = useContext(authRouteContext);

  if (!useAuth) {
    throw new Error("null");
  }
  return useAuth;
};
