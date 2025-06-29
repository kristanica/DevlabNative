import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../constants/constants";

const useSignOut = () => {
  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("isLoggin");

      await signOut(auth);
      router.replace("/");
    } catch {
      alert("Something went wrong....");
    }
  };

  return { logOut };
};

export default useSignOut;
