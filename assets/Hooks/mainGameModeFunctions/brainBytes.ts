import { useCallback } from "react";

const brainBytes = (choices: {
  a: string;
  b: string;
  c: string;
  d: string;
  correctAnswer: string;
}) => {
  const arrayChoices: any = Object.entries(choices).filter(
    ([key]) => key !== "correctAnswer"
  );

  const compareUserAnswer = useCallback(
    (answer: string) => {
      if (answer === choices.correctAnswer.trim()) {
        console.log("You are correct");
        return;
      }
    },
    [choices]
  );
  const brainFilter = async () => {
    const wrongOptions = arrayChoices.filter(
      ([key, value]: any) => value !== choices.correctAnswer.trim()
    );

    const randomIndex = Math.floor(Math.random() * wrongOptions.length);
    const optionToRemove = wrongOptions[randomIndex][0];

    const removedOneWrongAnswer = arrayChoices
      .filter(([key]: any) => key !== optionToRemove)
      .map(([_, value]: any) => value);

    return removedOneWrongAnswer;
  };

  return { arrayChoices, compareUserAnswer, brainFilter };
};

export default brainBytes;
