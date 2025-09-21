import unlockNextStage from "@/assets/API/fireBase/user/unlockNextStage";
import { auth } from "@/assets/constants/constants";
import userHp from "@/assets/zustand/userHp";
import { useMutation } from "@tanstack/react-query";
import errorShield from "../mainGameModeFunctions/globalItems/errorShield";

type submitAnswerPayload = {
  stageId: string;
  lessonId: string;
  levelId: string;
  category: string;
  resetStage: string;
  answer: boolean;
  setcurrentStageIndex: any;
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
      setcurrentStageIndex,
    }: submitAnswerPayload) => {
      const token = await auth.currentUser?.getIdToken(true);

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

        toastResult = "success";
        if (data.nextStageId && data.nextStageType) {
          console.log("run");
          setcurrentStageIndex((prev: any) => prev + 1);
          return;
        }

        if (data.setLevelComplete) {
          return;
        }
      }
      toastResult = "error";
      decrementUserHp();

      if (healthPointsTracker <= 1) {
        setcurrentStageIndex(0);

        resetUserHp();
      }
    },
  });
  return { nextStage, toastResult };
};

export default useSubmitAnswer;
