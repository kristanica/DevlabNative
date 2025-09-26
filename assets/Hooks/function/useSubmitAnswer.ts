import unlockNextStage from "@/assets/API/fireBase/user/unlockNextStage";
import unlockNextLevel from "@/assets/zustand/unlockNextLevel";
import userHp from "@/assets/zustand/userHp";
import { useMutation } from "@tanstack/react-query";
import errorShield from "../mainGameModeFunctions/globalItems/errorShield";
import { unlockAchievement } from "./unlockAchievement";

type submitAnswerPayload = {
  stageId: string;
  lessonId: string;
  levelId: string;
  category: string;
  answer?: boolean;
  setCurrentStageIndex: any;
  levelFinishedModal: any;
  finalAnswerModall: any;
  stageType: string;
};

const useSubmitAnswer = () => {
  const { hasShield, consumeErrorShield } = errorShield();
  const decrementUserHp = userHp.getState().decrementUserHp;
  const healthPointsTracker = userHp.getState().userHp;

  const resetUserHp = userHp.getState().resetUserHp;
  let toastResult: string = "success";
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
        console.log(data);
        if (data.isNextStageUnlocked) {
          console.log("HELLO");
          setCurrentStageIndex((prev: any) => prev + 1);
          return;
        } else if (data.isNextLevelUnlocked) {
          finalAnswerModall.closeModal();
          console.log("This is current LevelId" + levelId);
          if (levelId === "Level1" && lessonId === "Lesson1") {
            unlockAchievement(category, "firstLevelComplete", {
              LevelId: levelId,
              lessonId: lessonId,
            });
          }
          setTimeout(() => {
            levelFinishedModal.setVisibility(true);
          }, 200);
          setUnlockNextLevel({
            lessonId: lessonId,
            nextLevelId: res.nextLevelId,
          });
          return;
        } else if (data.isNextLessonUnlocked) {
          finalAnswerModall.closeModal();
          setTimeout(() => {
            levelFinishedModal.setVisibility(true);
          }, 200);
          setUnlockNextLesson(res.nextLessonId);
          return;
        } else {
          setTimeout(() => {
            levelFinishedModal.setVisibility(true);
          }, 200);
          setUnlockNextSubject(res.isWholeTopicFinished);
          return;
        }
      }
      decrementUserHp();

      if (healthPointsTracker <= 1) {
        setCurrentStageIndex(0);

        resetUserHp();
      }
    },
  });
  return { nextStage, toastResult };
};

export default useSubmitAnswer;
// else {

//         }
