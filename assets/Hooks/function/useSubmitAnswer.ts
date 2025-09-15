import { auth, URL } from "@/assets/constants/constants";
import { userHealthPoints } from "@/assets/zustand/userHealthPoints";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
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
  const decrementUserHealth = userHealthPoints.getState().decrementUserHealth;

  const resetUserHealth = userHealthPoints.getState().resetUserHealth;
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
      const userHealth = userHealthPoints.getState().health;
      const token = await auth.currentUser?.getIdToken(true);

      console.log(answer);
      if (hasShield && !answer) {
        const isShieldUsed = await consumeErrorShield();
        if (isShieldUsed) {
          return;
        }
      }
      if (answer) {
        try {
          const res = await axios.post(
            `${URL}/fireBase/unlockStage`,
            {
              subject: category,
              lessonId: lessonId,
              levelId: levelId,
              currentStageId: stageId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = res.data;
          toastResult = "success";
          if (data.nextStageId && data.nextStageType) {
            console.log(data.message);
            setcurrentStageIndex((prev: any) => prev + 1);
            return;
          }

          if (data.setLevelComplete) {
            return;
          }
        } catch (error) {
          console.log(error);
        }
      }
      toastResult = "error";
      decrementUserHealth();

      if (userHealth <= 1) {
        setcurrentStageIndex(0);

        resetUserHealth();
      }
    },
  });
  return { nextStage, toastResult };
};

export default useSubmitAnswer;
