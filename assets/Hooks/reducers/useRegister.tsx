import { auth, db } from "@/assets/constants/constants";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useReducer } from "react";

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
        // Save main profile data
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          username: state.username,
          age: Number(state.age),
          exp: 0,
          userLevel: 1,
          coins: 0,
          bio: "",
          isAdmin: false,
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
    }
  };

  return { state, dispatch, handleRegister };
};

export default useRegister;
