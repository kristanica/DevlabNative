import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useReducer } from "react";
import { auth, db } from "../constants/constants";

type State = {
  email: string;
  password: string;
};

type Action = {
  type: "UPDATE_FIELD_ADMIN";
  field: keyof State;
  value: string;
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
  });

  const adminLogin = async (isFailed?: () => void) => {
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
        console.log("error!");
      }
    } catch (error) {
      if (isFailed) {
        isFailed();
      }
      console.log(error);
    }
  };

  return { state, dispatch, adminLogin };
};

export default useAdminLogin;
