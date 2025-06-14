import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { StyleSheet } from "react-native";

type profileProvderProps = {
  profileVal: string | null;
  setProfile: (uri: string) => void;
};

type profileContextChildren = {
  children: ReactNode;
};

const profileContext = createContext<profileProvderProps | undefined>(
  undefined
);

export const ProfileProvider = ({ children }: profileContextChildren) => {
  const [profile, setProfile] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const val = await AsyncStorage.getItem("profileUri");
        if (val) {
          setProfile(val);
        }
      } catch (error) {
        console.log(error);
      }
    };
    load();
  });

  const setImage = async (uri: string) => {
    try {
      await AsyncStorage.setItem("profileUri", uri);
      setProfile(uri);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <profileContext.Provider
      value={{ profileVal: profile, setProfile: setImage }}
    >
      {children}
    </profileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(profileContext);
  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return context;
};

const styles = StyleSheet.create({});
