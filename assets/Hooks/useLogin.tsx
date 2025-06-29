import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useReducer } from "react";
import { Keyboard } from "react-native";
import { auth } from "../constants/constants";

type State = {
  email: string;
  password: string;
  keepSign: boolean;
};

type Action = {
  type: "UPDATE_FIELD";
  field: keyof State;
  value: string | boolean;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_FIELD": {
      return { ...state, [action.field]: action.value };
    }
  }
};

const useLogin = () => {
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    keepSign: false,
  });

  const signIn = async (isFailed?: () => void) => {
    try {
      await signInWithEmailAndPassword(auth, state.email, state.password);
      Keyboard.dismiss();
      // Determine wheter to keep sign in or not
      if (state.keepSign) {
        await AsyncStorage.setItem("isLoggin", "true");
      } else {
        await AsyncStorage.removeItem("isLoggin");
      }
      router.replace("/(auth)/home/Home");
    } catch (error) {
      const err = error as FirebaseError;
      let message = "An unknown error occurred. Please try again.";
      switch (err.code) {
        case "auth/invalid-email":
          message = "The email address is badly formatted.";
          break;
        case "auth/user-disabled":
          message = "This user account has been disabled.";
          break;
        case "auth/invalid-credential":
          message = "Credentials does not match";
          break;
        case "auth/wrong-password":
          message = "Incorrect password. Please try again.";
          break;
        case "auth/too-many-requests":
          message = "Too many login attempts. Try again later.";
          break;
        default:
          console.log("Firebase error:", err.code); // for dev/debugging
      }

      alert(message);
      if (isFailed) {
        isFailed();
      }
    }
  };

  // Redirects user to Home.tsxif keepSign is true
  useEffect(() => {
    const keepSignIn = async () => {
      try {
        const val = await AsyncStorage.getItem("isLoggin");
        if (val === "true") {
          router.replace("/(auth)/home/Home");
        }
      } catch (error) {
        console.log(error);
      }
    };

    keepSignIn();
  }, []);

  return { state, dispatch, signIn };
};

export default useLogin;
