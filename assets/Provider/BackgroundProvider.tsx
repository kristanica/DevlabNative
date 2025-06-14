import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type backgroundProps = {
  backgroundVal: string | null;
  setBackground: (uri: string) => void;
};

type backgroundChildren = {
  children: ReactNode;
};

const BackgroundContext = createContext<backgroundProps | undefined>(undefined);

export const BackgroundProvider = ({ children }: backgroundChildren) => {
  const [iBackground, setBackground] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const val = await AsyncStorage.getItem("imageUri");
        if (val) {
          setBackground(val);
        }
      } catch (error) {}
    };
    load();
  }, []);

  const setImage = async (uri: string) => {
    try {
      await AsyncStorage.setItem("imageUri", uri);
      setBackground(uri);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BackgroundContext.Provider
      value={{ backgroundVal: iBackground, setBackground: setImage }}
    >
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return context;
};
