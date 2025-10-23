import { ActiveItemIcon } from "@/assets/zustand/ActiveItemIcon";
import { isAnswerCorrect } from "@/assets/zustand/isAnswerCorrect";
import userHp from "@/assets/zustand/userHp";
import { useHandleDecrementHp } from "../function/useHandleDecrementHp";
import { useHandleGameOver } from "../function/useHandleGameOver";
import { unlock } from "../query/mutation/unlock";

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
  levelId: string,
  LevelFinishedModal: any
) => {
  const arrayChoices: any = Object.entries(choices)
    .filter(([key]) => key !== "correctAnswer")
    .map(([_, values]: any) => values);
  // const removeActiveBuff = activeBuffsLocal.getState().removeActiveBuff;
  const setIsCorrect = isAnswerCorrect((state) => state.setIsCorrect);
  const unlockNext = unlock(
    setCurrentStageIndex,
    LevelFinishedModal,
    "BrainBytes"
  );
  const setActiveItem = ActiveItemIcon.getState().setActiveIcon;
  const { handleDecrementHp } = useHandleDecrementHp();
  const { handleGameOver } = useHandleGameOver();
  const healthPointsTracker = userHp.getState().userHp;
  let optionsArray = Object.entries(choices)
    .filter(([key]) => key !== "correctAnswer")
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB));

  // const compareUserAnswer = async (answer: string) => {
  //   if (
  //     answer.toLocaleUpperCase() ===
  //     choices.correctAnswer.trim().toLocaleUpperCase()
  //   ) {
  //     console.log("You are correct");
  //     unlockNext.mutate({
  //       category: category,
  //       lessonId: lessonId,
  //       levelId: levelId,
  //       stageId: stageId,
  //     });

  //     setActiveItem({ BrainFilter: false });
  //     setIsCorrect(true);
  //     return;
  //   } else {
  //     handleDecrementHp();
  //     setActiveItem({ BrainFilter: false });
  //     console.log(healthPointsTracker + "BrainBbvytes health");
  //     if (healthPointsTracker <= 1) {
  //       handleGameOver({
  //         category,
  //         lessonId,
  //         levelId,
  //         stageId,
  //         setCurrentStageIndex,
  //       });
  //     }
  //     setActiveItem({ BrainFilter: false });
  //     console.log("You are wrong");
  //     setIsCorrect(false);
  //   }
  // };

  const brainFilterItem = () => {
    // const wrongOptions = arrayChoices.filter(
    //   (value: string) => value !== choices.correctAnswer.trim()
    // );
    const wrongOptions = optionsArray.filter(
      ([key]) => key !== choices.correctAnswer.trim()
    );
    if (wrongOptions.length === 0) return optionsArray;
    const randomIndex = Math.floor(Math.random() * wrongOptions.length);
    const optionToRemove = wrongOptions[randomIndex][0];
    const filteredOptions = optionsArray.filter(
      ([key]) => key !== optionToRemove
    );

    console.log("WRONG ANSWERRRRRRRRRRRRRRRRR" + filteredOptions);
    return filteredOptions;
  };

  return { arrayChoices, brainFilterItem, optionsArray };
};

export default brainFilter;
