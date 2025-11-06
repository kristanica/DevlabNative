import { auth, db } from "@/constants";
import { router } from "expo-router";
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useReducer } from "react";

type State = {
  email: string;
  password: string;
  isLoggingIn: boolean;
};

type Action = {
  type: "UPDATE_FIELD_ADMIN";
  field: keyof State;
  value: string | boolean;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "UPDATE_FIELD_ADMIN": {
      return {
        ...state,
        [action.field]: action.value,
      };
    }
  }
};
const useAdminLogin = () => {
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    isLoggingIn: false,
  });

  const adminLogin = async () => {
    dispatch({
      type: "UPDATE_FIELD_ADMIN",
      field: "isLoggingIn",
      value: true,
    });
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );
      const user = userCredentials.user;
      const userRef = doc(db, "Users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.data() && !userDoc.exists) {
        return;
      }
      if (userDoc.data()?.isAdmin && userDoc.exists()) {
        router.replace({
          pathname: "/(admin)/home/UserManagement",
        });
      } else {
        return ["error", "You're not an admin!"];
      }
    } catch (error) {
      console.log(error);
      const authError = error as AuthError;
      switch (authError.code) {
        case "auth/invalid-email":
          return ["error", "Check your email format"];
        case "auth/missing-password": {
          return ["error", "Check your password"];
        }
        case "auth/invalid-credential": {
          return ["error", "Invalid Credentials"];
        }
        case "auth/too-many-requests":
          return ["error", "Too many attempts"];
        default:
          return ["error", authError.message];
      }
    } finally {
      dispatch({
        type: "UPDATE_FIELD_ADMIN",
        field: "isLoggingIn",
        value: false,
      });
    }
  };

  return { state, dispatch, adminLogin };
};

export default useAdminLogin;
