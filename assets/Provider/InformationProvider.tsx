import { doc, getDoc } from "firebase/firestore";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../constants/constants";

type userData = {
  username: any;
};

type InformationProviderProps = {
  userData: userData | null;
};
type childrenProps = {
  children: ReactNode;
};
const informationProviderContext = createContext<
  InformationProviderProps | undefined
>(undefined);
export const InformationProvider = ({ children }: childrenProps) => {
  const [userData, setUserData] = useState<userData | null>(null);
  useEffect(() => {
    const getUser = async () => {
      const uid = auth.currentUser?.uid;
      console.log(uid);

      if (!uid) {
        console.log("No user UID found.");
        return;
      }
      try {
        const userRef = doc(db, "Users", uid);
        const data = await getDoc(userRef);
        if (data.exists()) {
          const userData = data.data() as userData;
          setUserData(userData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  return (
    <informationProviderContext.Provider value={{ userData }}>
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
