import { auth, db } from "@/assets/constants/constants";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useReducer } from "react";
import Toast from "react-native-toast-message";

type State = {
  email: string;
  password: string;
  username: string;
  age: number;
  isRegitering: boolean;
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
    default: {
      return state;
    }
  }
};

const useRegister = () => {
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    username: "",
    age: 0,
    isRegitering: false,
  });

  const handleRegister = async () => {
    if (state.isRegitering) return;
    dispatch({ type: "UPDATE_FIELD", field: "isRegitering", value: "true" });
    try {
      await createUserWithEmailAndPassword(auth, state.email, state.password);
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);

        Toast.show({
          type: "info",
          text1: "Please check your email for confirmation",
          visibilityTime: 2000,
          position: "top",
          topOffset: 50,
        });
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          username: state.username,
          age: Number(state.age),
          exp: 0,
          userLevel: 1,
          coins: 0,
          bio: "",
          isAdmin: false,
          isSuspended: false,
          healthPoints: 3,
          lastOpenedLevel: {
            subject: "Html",
            lessonId: "Lesson1",
            levelId: "Level1",
          },
        });
        // Optional: Add empty Inventory doc
        await setDoc(
          doc(db, "Users", user.uid, "Inventory", "placeholder"),
          {}
        );
        // Initialize Level1 unlocked for each subject, including Stage1
        const subjects = ["Html", "Css", "JavaScript", "Database"];

        for (const subject of subjects) {
          // Create Level1 document
          await setDoc(doc(db, "Users", user.uid, "Progress", subject), {
            status: true,
          });
          await setDoc(
            doc(
              db,
              "Users",
              user.uid,
              "Progress",
              subject,
              "Lessons",
              "Lesson1"
            ),
            {
              status: true,
            }
          );
          await setDoc(
            doc(
              db,
              "Users",
              user.uid,
              "Progress",
              subject,
              "Lessons",
              "Lesson1",
              "Levels",
              "Level1"
            ),
            {
              status: true,
              rewardClaimed: false,
            }
          );

          // Create Stage1 document inside Stages subcollection of Level1
          await setDoc(
            doc(
              db,
              "Users",
              user.uid,
              "Progress",
              subject,
              "Lessons",
              "Lesson1",
              "Levels",
              "Level1",
              "Stages",
              "Stage1"
            ),
            {
              status: true,
            }
          );
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "UPDATE_FIELD", field: "isRegitering", value: "false" });
    }
  };

  return { state, dispatch, handleRegister };
};

export default useRegister;
