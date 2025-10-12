import unlockNextStage from "@/assets/API/fireBase/user/unlockNextStage";
import { isAnswerCorrect } from "@/assets/zustand/isAnswerCorrect";
import userHp from "@/assets/zustand/userHp";
import { activeBuffsLocal } from "../function/activeBuffsLocal";
import { useHandleDecrementHp } from "../function/useHandleDecrementHp";
import { useHandleGameOver } from "../function/useHandleGameOver";

const brainFilter = (
  choices: {
    a: string;
    b: string;
    c: string;
    d: string;
    correctAnswer: string;
  },
  setCurrentStageIndex: any,
  lessonId: string,
  category: string,
  stageId: string,
  levelId: string
) => {
  const arrayChoices: any = Object.entries(choices)
    .filter(([key]) => key !== "correctAnswer")
    .map(([_, values]: any) => values);
  const removeActiveBuff = activeBuffsLocal.getState().removeActiveBuff;
  const setIsCorrect = isAnswerCorrect((state) => state.setIsCorrect);
  const resetUserHp = userHp.getState().resetUserHp;
  const { handleDecrementHp } = useHandleDecrementHp();
  const { handleGameOver } = useHandleGameOver();
  const healthPointsTracker = userHp.getState().userHp;
  let optionsArray = Object.entries(choices)
    .filter(([key]) => key !== "correctAnswer")
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB));

  const compareUserAnswer = async (answer: string) => {
    if (answer === choices.correctAnswer.trim()) {
      console.log("You are correct");
      await unlockNextStage({
        category: category,
        lessonId: lessonId,
        levelId: levelId,
        stageId: stageId,
      });
      setCurrentStageIndex((prev: any) => prev + 1);
      setIsCorrect(true);
      return;
    } else {
      handleDecrementHp();
      if (healthPointsTracker <= 1) {
        handleGameOver({
          category,
          lessonId,
          levelId,
          stageId,
          setCurrentStageIndex,
        });
      }

      console.log("You are wrong");
      setIsCorrect(false);
    }
  };

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

  return { arrayChoices, compareUserAnswer, brainFilterItem, optionsArray };
};

export default brainFilter;
