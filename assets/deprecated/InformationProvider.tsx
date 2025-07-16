import { doc, onSnapshot } from "firebase/firestore";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../constants/constants";
import useMounted from "../Hooks/useMounted";

type userData = {
  username: string;
  bio: string;
  coins: number;
  exp: number;
  userLevel: number;
};

type InformationProviderProps = {
  loading: boolean;
  userData: userData | null;
  setUserData: (val: any) => void;
};
type childrenProps = {
  children: ReactNode;
};
const informationProviderContext = createContext<
  InformationProviderProps | undefined
>(undefined);
export const InformationProvider = ({ children }: childrenProps) => {
  const [userData, setUserData] = useState<userData | null>(null);
  const [loading, setloading] = useState<boolean>(false);
  const isMounted = useMounted();
  useEffect(() => {
    const getUser = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid || !isMounted.current) {
        console.log("No user UID found.");
        return;
      }
      try {
        setloading(true);
        const userRef = doc(db, "Users", uid);
        onSnapshot(userRef, (docSnap) => {
          if (!isMounted.current) return;
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData({
              username: data.username,
              bio: data.bio,
              coins: data.coins,
              exp: data.exp,
              userLevel: data.userLevel,
            });
          }
        });
      } catch (error) {
        if (isMounted.current) {
          console.log(error);
        }
      } finally {
        if (isMounted.current) {
          setloading(false);
        }
      }
    };
    getUser();
  }, []);
  return (
    <informationProviderContext.Provider
      value={{ userData, loading, setUserData }}
    >
      {children}
    </informationProviderContext.Provider>
  );
};

export const useInfo = () => {
  const useInfo = useContext(informationProviderContext);
  if (!useInfo) {
    throw new Error("Must be used within InformationProvider");
  }
  return useInfo;
};
