import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
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
      router.replace("/(user)/LoadingScreen");
    } catch (error) {
      console.log(error);
      if (isFailed) {
        isFailed();
      }
    }
  };

  // Redirects user to LoadingScreen.tsx first then home.tsx if keepSign is true
  useEffect(() => {
    const keepSignIn = async () => {
      try {
        const val = await AsyncStorage.getItem("isLoggin");
        if (val === "true") {
          // redirects first to LoadingScreen to simulate loading and avoid seeing userinformation as blank as it is being fetched first
          router.replace("/(user)/LoadingScreen");
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
