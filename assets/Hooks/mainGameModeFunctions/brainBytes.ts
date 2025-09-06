import { auth, db } from "@/assets/constants/constants";
import { isAnswerCorrect } from "@/assets/zustand/isAnswerCorrect";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";

const brainBytes = (choices: {
  a: string;
  b: string;
  c: string;
  d: string;
  correctAnswer: string;
}) => {
  const arrayChoices: any = Object.entries(choices)
    .filter(([key]) => key !== "correctAnswer")
    .map(([_, values]: any) => values);

  const setIsCorrect = isAnswerCorrect((state) => state.setIsCorrect);

  const compareUserAnswer = useCallback(
    (answer: string) => {
      if (answer === choices.correctAnswer.trim()) {
        console.log("You are correct");
        setIsCorrect(true);
        return;
      } else {
        console.log("You are wrong");
        setIsCorrect(false);
      }
    },
    [choices.correctAnswer, setIsCorrect]
  );

  const brainFilter = async () => {
    const wrongOptions = arrayChoices.filter(
      (value: string) => value !== choices.correctAnswer.trim()
    );

    const randomIndex = Math.floor(Math.random() * wrongOptions.length);
    const optionToRemove = wrongOptions[randomIndex];

    const removedOneWrongAnswer = arrayChoices.filter(
      (value: string) => value !== optionToRemove
    );

    const userRef = doc(db, "Users", String(auth?.currentUser?.uid));

    await updateDoc(userRef, {
      activeBuffs: arrayRemove("brainFilter"),
    }).catch(console.error);

    return removedOneWrongAnswer;
  };

  return { arrayChoices, compareUserAnswer, brainFilter };
};

export default brainBytes;
