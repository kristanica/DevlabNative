import unlockNextLevel from "@/assets/zustand/unlockNextLevel";
import userHp from "@/assets/zustand/userHp";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { unlock } from "../query/mutation/unlock";
import { unlockAchievement } from "./unlockAchievement";
import { useHandleDecrementHp } from "./useHandleDecrementHp";
import { useHandleGameOver } from "./useHandleGameOver";

const useSubmitAnswer = (
  setCurrentStageIndex: Dispatch<SetStateAction<number>>,
  levelFinishedModal: any,
  finalAnswerModall: any,
  gameOverModal: any
) => {
  const healthPointsTracker = userHp.getState().userHp;
  const unlockNext = unlock(setCurrentStageIndex);
  const { handleGameOver } = useHandleGameOver(gameOverModal);
  const { handleDecrementHp } = useHandleDecrementHp();
  const setUnlockNextLevel = unlockNextLevel.getState().unlockNextLevel;
  const setUnlocknextLesson = unlockNextLevel.getState().unlockNextLevel;
  const markTopicFinished = unlockNextLevel.getState().markTopicFinished;
  const nextStage = useMutation({
    mutationKey: ["submitAnswer"],
    mutationFn: async ({
      stageId,
      lessonId,
      levelId,
      category,
      answer,

      stageType,
    }: any) => {
      if (answer || stageType === "Lesson") {
        const unlockData = await unlockNext.mutateAsync({
          category,
          lessonId,
          levelId,
          stageId,
        });

        if (unlockData.isNextLevelUnlocked) {
          await unlockAchievement(category, "firstLevelComplete", {
            Levelid: levelId,
            lessonId: lessonId,
          });
          finalAnswerModall.closeModal();
          setTimeout(() => {
            levelFinishedModal.setVisibility(true);
          }, 200);
          setUnlockNextLevel({
            category: category,
            stageId: "Stage1",
            lessonId: lessonId,
            prevLevelId: levelId,
            nextLevelId: unlockData.nextLevelId,
          });
          return ["levelUnlocked", "You've finished a level!"];
        } else if (unlockData.isNextLessonUnlocked) {
          finalAnswerModall.closeModal();
          await unlockAchievement(category, "lessonComplete", {
            lessonId: lessonId,
          });
          setTimeout(() => {
            levelFinishedModal.setVisibility(true);
          }, 200);
          setUnlocknextLesson({
            category: category,
            stageId: "Stage1",
            nextLevelId: "Level1",
            prevLevelId: levelId,
            lessonId: unlockData.nextLessonId,
          });
          return ["levelUnlocked", "New lesson unlocked!"];
        } else if (unlockData.isWholeTopicFinished) {
          //Sets the lesson completion per category
          markTopicFinished(category);
          await unlockAchievement(category, "subjectComplete", {});
          finalAnswerModall.closeModal();

          setTimeout(() => {
            levelFinishedModal.setVisibility(true);
          }, 200);

          return ["topicFinished", "You've completed the entire topic!"];
        }
        return;
      }

      if (healthPointsTracker <= 1) {
        handleGameOver({
          stageId,
          lessonId,
          levelId,
          category,
          setCurrentStageIndex,
        });
      }

      // If useranswered incorrectly
      handleDecrementHp();

      return ["loseOneHp", "You got that one wrong!"];
    },
  });
  return { nextStage };
};

export default useSubmitAnswer;
