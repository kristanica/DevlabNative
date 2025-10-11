import { gameOver } from "@/assets/API/fireBase/user/Stages/gameOver";
import unlockNextStage from "@/assets/API/fireBase/user/unlockNextStage";
import unlockNextLevel from "@/assets/zustand/unlockNextLevel";
import userHp from "@/assets/zustand/userHp";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import errorShield from "../mainGameModeFunctions/globalItems/errorShield";

const useSubmitAnswer = () => {
  const { hasShield, consumeErrorShield } = errorShield();
  const decrementUserHp = userHp.getState().decrementUserHp;
  const healthPointsTracker = userHp.getState().userHp;

  const resetUserHp = userHp.getState().resetUserHp;

  const nextStage = useMutation({
    mutationFn: async ({
      stageId,
      lessonId,
      levelId,
      category,
      answer,
      setCurrentStageIndex,
      levelFinishedModal,
      finalAnswerModall,
      stageType,
    }: submitAnswerPayload) => {
      const setUnlockNextLevel = unlockNextLevel.getState().unlockNextLevel;

      if (hasShield && !answer) {
        const isShieldUsed = await consumeErrorShield();
        Toast.show({
          type: "success",
          text1: "Error shiled Consumed!",
        });
        if (isShieldUsed) {
          return;
        }
      }

      if (answer || stageType === "Lesson") {
        const res = await unlockNextStage({
          category: category,
          lessonId: lessonId,
          levelId: levelId,
          stageId: stageId,
        });

        const data = res;

        if (data.isNextStageUnlocked) {
          setCurrentStageIndex((prev: any) => prev + 1);
          return ["stageUnlocked", "You got that one right!"];
        }
        //If there is still next level, unlocks it
        else if (data.isNextLevelUnlocked) {
          finalAnswerModall.closeModal();

          // if (levelId === "Level1" && lessonId === "Lesson1") {
          //   unlockAchievement(category, "firstLevelComplete", {
          //     LevelId: levelId,
          //     lessonId: lessonId,
          //   });
          //   setTimeout(() => {
          //     levelFinishedModal.setVisibility(true);
          //   }, 200);
          //   return ["levelUnlocked", "You've unlocked an achievement!"];
          // }

          setTimeout(() => {
            levelFinishedModal.setVisibility(true);
          }, 200);
          console.log(res);
          setUnlockNextLevel({
            lessonId: lessonId,
            nextLevelId: res.nextLevelId,
          });
          return;
        }
        // if there is still next Lesson, unclocks it
      }

      if (healthPointsTracker <= 1) {
        await gameOver({ category, lessonId, levelId, stageId });
        setCurrentStageIndex(0);
        resetUserHp();

        return ["reset", "You've ran out of hp!"];
      }

      decrementUserHp();
      console.log("loseOneHp");
      return ["loseOneHp", "You got that one wrong!"];
    },
  });
  return { nextStage };
};

export default useSubmitAnswer;
// else {

//         }
