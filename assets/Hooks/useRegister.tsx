import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useReducer } from "react";
import { auth, db } from "../constants/constants";

type State = {
  email: string;
  password: string;
  // confirmPassword: string;
  username: string;
  age: number;
};

type Action = {
  type: "UPDATE_FIELD";
  field: keyof State;
  value: string;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_FIELD": {
      return { ...state, [action.field]: action.value };
    }
  }
};

const useRegister = () => {
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    // confirmPassword: "",
    username: "",
    age: 0,
  });

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, state.email, state.password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          username: state.username,
          age: Number(state.age),
          exp: 0,
          level: 1,
          suspend: false,
          coins: 0,
          bio: "",
          lastOpenedLevel: {
            lessonId: "Html", // Firestore collection
            lessonDocId: "Lesson1", // Firestore document inside collection
            levelId: "Level1", // Firestore document inside Levels subcollection
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { state, dispatch, handleRegister };
};

export default useRegister;
