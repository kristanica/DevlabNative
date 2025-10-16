import unlockNextStage from "@/assets/API/fireBase/user/unlockNextStage";
import unlockNextLevel from "@/assets/zustand/unlockNextLevel";
import userHp from "@/assets/zustand/userHp";
import { useMutation } from "@tanstack/react-query";
import { useHandleDecrementHp } from "./useHandleDecrementHp";
import { useHandleGameOver } from "./useHandleGameOver";

const useSubmitAnswer = () => {
  const healthPointsTracker = userHp.getState().userHp;
  const { handleGameOver } = useHandleGameOver();
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
    }: any) => {
      const { handleDecrementHp } = useHandleDecrementHp();
      const setUnlockNextLevel = unlockNextLevel.getState().unlockNextLevel;
      console.log(answer + "useSubmitAnswer");
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
        } else if (data.isNextLevelUnlocked) {
          finalAnswerModall.closeModal();
          setTimeout(() => {
            levelFinishedModal.setVisibility(true);
          }, 200);
          console.log(res);
          console.log("Hello");
          setUnlockNextLevel({
            lessonId: lessonId,
            nextLevelId: res.nextLevelId,
          });
          return;
        } else if (data.isWholeTopicFinished) {
          finalAnswerModall.closeModal();
          setTimeout(() => {
            levelFinishedModal.setVisibility(true);
          }, 200);

          return;
        }
      }

      if (healthPointsTracker <= 1) {
        handleGameOver({
          stageId,
          lessonId,
          levelId,
          category,
          setCurrentStageIndex,
        });
        return ["reset", "You've ran out of hp!"];
      }
      handleDecrementHp();

      return ["loseOneHp", "You got that one wrong!"];
    },
  });
  return { nextStage };
};

export default useSubmitAnswer;
