import { auth, db, path } from "@/assets/constants/constants";
import { doc, getDoc } from "@firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useReducer } from "react";
import { Keyboard } from "react-native";

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

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );

      if (!userCredential.user) {
        return;
      }
      const userRef = doc(db, "Users", userCredential?.user.uid);
      const data = await getDoc(userRef);
      //check if account is suspended
      if (data.data()?.suspend) {
        console.log("your account is suspended");
        await signOut(auth);
        router.replace({ pathname: path.LOGIN });
        return;
      }

      Keyboard.dismiss();
      // Determine wheter to keep sign in or not
      if (state.keepSign) {
        await AsyncStorage.setItem("isLoggin", "true");
      } else {
        await AsyncStorage.removeItem("isLoggin");
      }

      router.replace("/(user)/LoadingScreen");
      return "success";
    } catch (error) {
      console.log(error);
      return "error";
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
