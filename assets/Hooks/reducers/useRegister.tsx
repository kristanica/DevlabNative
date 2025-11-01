import { auth, db } from "@/constants";
import {
  AuthError,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useReducer } from "react";
import Toast from "react-native-toast-message";
import { validateEmail, validatePassword } from "../function/validationUtility";

type State = {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
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
    confirmPassword: "",
  });

  const handleRegister = async () => {
    try {
      const isEmailValid = validateEmail(state.email);
      if (isEmailValid[0] === "error") {
        console.log(isEmailValid);

        return [isEmailValid[0], isEmailValid[1]];
      }

      const isPasswordValid = validatePassword(state.password);

      if (isPasswordValid[0] === "error") {
        return [isPasswordValid[0], isPasswordValid[1]];
      }
      if (state.password !== state.confirmPassword) {
        return ["error", "Password does not match!"];
      }

      await createUserWithEmailAndPassword(auth, state.email, state.password);
      const user = auth.currentUser;
      if (user) {
        //Email verification
        await sendEmailVerification(user);

        Toast.show({
          type: "info",
          text1: "Please check your email for confirmation",
          visibilityTime: 2000,
          position: "top",
          topOffset: 50,
        });

        const promises: any[] = [];

        promises.push(
          setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            username: state.username,
            exp: 0,
            userLevel: 1,
            coins: 0,
            bio: "",
            isAdmin: false,
            isSuspended: false,
            healthPoints: 3,
            lastOpenedLevel: {},
          })
        );

        // Initialize Level1 unlocked for each subject, including Stage1
        const subjects = ["Html", "Css", "JavaScript", "Database"];

        for (const subject of subjects) {
          promises.push(
            setDoc(doc(db, "Users", user.uid, "Progress", subject), {
              status: true,
            })
          );

          promises.push(
            setDoc(
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
                isActive: true,
                isCompleted: false,
              }
            )
          );
          promises.push(
            setDoc(
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
                isActive: true,
                isRewardClaimed: false,
                dateUnlocked: new Date(),
                isCompleted: false,
              }
            )
          );

          // Create Stage1 document inside Stages subcollection of Level1
          promises.push(
            setDoc(
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
                isActive: true,
                isCompleted: true,
                dateUnlocked: new Date(),
              }
            )
          );
        }
        await Promise.all(promises);
      }
      return ["success", "Registration complete!"];
    } catch (error) {
      const authError = error as AuthError;
      switch (authError.code) {
        case "auth/email-already-in-use":
          return ["error", "This email is already registered"];
        case "auth/invalid-email":
          return ["error", "Invalid email format"];

        case "auth/weak-password":
          return ["error", "Password must be at least 8 characters"];
        case "auth/network-request-failed":
          return ["error", "Network error. Check your connection"];
        case "auth/too-many-requests":
          return ["error", "Too many attempts"];
        default:
          return ["error", authError.message];
      }
    }
  };

  return { state, dispatch, handleRegister };
};

export default useRegister;
