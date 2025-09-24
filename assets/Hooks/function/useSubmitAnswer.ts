import unlockNextStage from "@/assets/API/fireBase/user/unlockNextStage";
import unlockNextLevel from "@/assets/zustand/unlockNextLevel";
import userHp from "@/assets/zustand/userHp";
import { useMutation } from "@tanstack/react-query";
import errorShield from "../mainGameModeFunctions/globalItems/errorShield";

type submitAnswerPayload = {
  stageId: string;
  lessonId: string;
  levelId: string;
  category: string;
  answer: boolean;
  setCurrentStageIndex: any;
  levelFinishedModal: any;
  finalAnswerModall: any;
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
    }: submitAnswerPayload) => {
      const setUnlockNextLevel = unlockNextLevel.getState().unlockNextLevel;
      const setUnlockNextLesson = unlockNextLevel.getState().unlockNextLesson;
      if (hasShield && !answer) {
        const isShieldUsed = await consumeErrorShield();
        if (isShieldUsed) {
          return;
        }
      }

      if (answer) {
        const res = await unlockNextStage({
          category: category,
          lessonId: lessonId,
          levelId: levelId,
          stageId: stageId,
        });

        const data = res;
        console.log(data);
        if (data.nextStageId && data.nextStageType) {
          console.log("HELLO");
          setCurrentStageIndex((prev: any) => prev + 1);
          return;
        } else if (data.isNextLevelUnlocked) {
          finalAnswerModall.closeModal();

          setTimeout(() => {
            levelFinishedModal.setVisibility(true);
          }, 200);
          setUnlockNextLevel({
            lessonId: lessonId,
            nextLevelId: res.nextLevelId,
          });
          return;
        } else {
          finalAnswerModall.closeModal();

          setTimeout(() => {
            levelFinishedModal.setVisibility(true);
          }, 200);
          setUnlockNextLevel({
            lessonId: lessonId,
            nextLevelId: res.nextLevelId,
          });
          console.log("THIS IS THE NEXXCT LESSON ID", res.nextLessonId);
          setUnlockNextLesson(res.nextLessonId);
          return;
        }
      }
      toastResult = "error";
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
