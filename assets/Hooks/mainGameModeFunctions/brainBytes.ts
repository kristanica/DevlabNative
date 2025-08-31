import { useCallback } from "react";

const brainBytes = (choices: {
  a: string;
  b: string;
  c: string;
  d: string;
  correctAnswer: string;
}) => {
  const arrayChoices: any =
    Object.entries(choices)
      .filter(([key, _]) => key !== "correctAnswer")
      .map(([_, choices]) => choices) ?? [];

  const compareUserAnswer = useCallback(
    (answer: string) => {
      if (answer === choices.correctAnswer.trim()) {
        console.log("You are correct");
        return;
      }

      console.log("BOB");
    },
    [choices]
  );

  return { arrayChoices, compareUserAnswer };
};

export default brainBytes;
