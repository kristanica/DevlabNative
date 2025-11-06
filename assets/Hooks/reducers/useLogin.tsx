import { auth } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useReducer } from "react";
import { Keyboard } from "react-native";

type State = {
  email: string;
  password: string;
  keepSign: boolean;
  isLoggingIn: boolean;
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
    isLoggingIn: false,
  });

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );
      dispatch({ type: "UPDATE_FIELD", field: "isLoggingIn", value: true });
      //Checks wether user has verified their username. If not, will show a custom toast.
      await userCredential.user.reload();
      if (!userCredential.user.emailVerified) {
        return ["unverifiedEmail", "Your email has not been verified yet!"];
      }
      dispatch({ type: "UPDATE_FIELD", field: "isLoggingIn", value: true });
      if (!userCredential.user) {
        return;
      }

      Keyboard.dismiss();

      if (state.keepSign) {
        await AsyncStorage.setItem("isLoggin", "true");
      } else {
        await AsyncStorage.removeItem("isLoggin");
      }

      //checks customclaims for admin
      const tokenResult = await userCredential.user.getIdTokenResult(true);
      const checkAdmin = tokenResult.claims.role;
      console.log(checkAdmin);

      if (checkAdmin === "admin") {
        router.replace({
          pathname: "/(admin)/home/UserManagement",
        });
        return;
      } else {
        router.replace({
          pathname: "/(user)/home/(drawer)/(tabs)/Home",
        });
      }
    } catch (error) {
      const e = error as AuthError;
      switch (e.code) {
        case "auth/invalid-credential": {
          return ["error", "Invalid Credentials"];
        }
        case "auth/user-disabled": {
          return ["error", "Your account is suspended"];
        }
        default:
          console.log(e.code);
          return ["error", e.message];
      }
    } finally {
      dispatch({ type: "UPDATE_FIELD", field: "isLoggingIn", value: false });
    }
  };

  // Redirects user to LoadingScreen.tsx first then home.tsx if keepSign is true
  useEffect(() => {
    const keepSignIn = async () => {
      try {
        const val = await AsyncStorage.getItem("isLoggin");
        if (val === "true") {
          // redirects first to LoadingScreen to simulate loading and avoid seeing userinformation as blank as it is being fetched first
          router.replace("/home/Home");
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
