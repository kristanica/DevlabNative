import { gameOver } from "@/assets/API/fireBase/user/Stages/gameOver";
import unlockNextStage from "@/assets/API/fireBase/user/unlockNextStage";
import { isAnswerCorrect } from "@/assets/zustand/isAnswerCorrect";
import userHp from "@/assets/zustand/userHp";
import Toast from "react-native-toast-message";
import { activeBuffsLocal } from "../function/activeBuffsLocal";
import errorShield from "./globalItems/errorShield";

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

  const { hasShield, consumeErrorShield } = errorShield();
  const decrementUserHp = userHp.getState().decrementUserHp;
  const healthPointsTracker = userHp.getState().userHp;

  const compareUserAnswer = async (answer: string) => {
    let optionsArray = Object.entries(choices)
      .filter(([key]) => key !== "correctAnswer")
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    console.log(optionsArray);
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
      if (hasShield) {
        const isShieldUsed = await consumeErrorShield();
        Toast.show({
          type: "success",
          text1: "Error shiled Consumed!",
        });
        if (isShieldUsed) {
          return;
        }
      }
      if (healthPointsTracker <= 1) {
        console.log(category, lessonId, levelId, stageId);
        await gameOver({ category, lessonId, levelId, stageId });
        setCurrentStageIndex(0);
        resetUserHp();
      }

      console.log("You are wrong");
      decrementUserHp();
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

  return { arrayChoices, compareUserAnswer, brainFilterItem };
};

export default brainFilter;
