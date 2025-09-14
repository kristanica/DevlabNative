import { isAnswerCorrect } from "@/assets/zustand/isAnswerCorrect";
import { useCallback } from "react";
import { activeBuffsLocal } from "../function/activeBuffsLocal";

const brainFilter = (choices: {
  a: string;
  b: string;
  c: string;
  d: string;
  correctAnswer: string;
}) => {
  const arrayChoices: any = Object.entries(choices)
    .filter(([key]) => key !== "correctAnswer")
    .map(([_, values]: any) => values);
  const removeActiveBuff = activeBuffsLocal.getState().removeActiveBuff;
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

  const brainFilterItem = () => {
    const wrongOptions = arrayChoices.filter(
      (value: string) => value !== choices.correctAnswer.trim()
    );

    const randomIndex = Math.floor(Math.random() * wrongOptions.length);
    const optionToRemove = wrongOptions[randomIndex];

    const removedOneWrongAnswer = arrayChoices.filter(
      (value: string) => value !== optionToRemove
    );

    removeActiveBuff("brainFilter");

    return removedOneWrongAnswer;
  };

  return { arrayChoices, compareUserAnswer, brainFilterItem };
};

export default brainFilter;
