import { gameOver } from "@/assets/API/fireBase/user/Stages/gameOver";
import unlockNextStage from "@/assets/API/fireBase/user/unlockNextStage";
import unlockNextLevel from "@/assets/zustand/unlockNextLevel";
import userHp from "@/assets/zustand/userHp";
import { useMutation } from "@tanstack/react-query";
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
      const setUnlockNextLesson = unlockNextLevel.getState().unlockNextLesson;
      const setUnlockNextSubject = unlockNextLevel.getState().unlockNextSubject;
      if (hasShield && !answer) {
        const isShieldUsed = await consumeErrorShield();
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
        //if there is still next Lesson, unclocks it
        // else if (data.isNextLessonUnlocked) {
        //   finalAnswerModall.closeModal();
        //   setTimeout(() => {
        //     levelFinishedModal.setVisibility(true);
        //   }, 200);
        //   setUnlockNextLesson(res.nextLessonId);

        //   return ["lessonUnlocked", "You've unlocked a new lesson!"];
        // }
        // //if there are no more lesson and levels, completes the whole topic
        // else {
        //   setTimeout(() => {
        //     levelFinishedModal.setVisibility(true);
        //   }, 200);
        //   setUnlockNextSubject(res.isWholeTopicFinished);
        //   return ["wholeTopicFinished", "You've finished a whole topic!"];
        // }
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
