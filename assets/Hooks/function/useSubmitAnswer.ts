import { auth, URL } from "@/assets/constants/constants";
import { userHealthPoints } from "@/assets/zustand/userHealthPoints";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";
import errorShield from "../mainGameModeFunctions/globalItems/errorShield";

type submitAnswerPayload = {
  stageId: string;
  lessonId: string;
  levelId: string;
  category: string;
  resetStage: string;
};

const useSubmitAnswer = () => {
  const { hasShield, consumeErrorShield } = errorShield();
  const decrementUserHealth = userHealthPoints.getState().decrementUserHealth;

  const resetUserHealth = userHealthPoints.getState().resetUserHealth;

  const nextStage = useMutation({
    mutationFn: async ({
      stageId,
      lessonId,
      levelId,
      category,
      resetStage,
    }: submitAnswerPayload) => {
      const answer: boolean = true;
      const userHealth = userHealthPoints.getState().health;
      const token = await auth.currentUser?.getIdToken(true);
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

          if (data.nextStageId && data.nextStageType) {
            console.log(data.message);
            router.push({
              pathname: "/home/category/stage/[stageId]",
              params: {
                stageId: data.nextStageId,
                lessonId,
                levelId,
                category,
              },
            });
            return;
          }

          if (data.setLevelComplete) {
            return;
          }
        } catch (error) {
          console.log(error);
        }
      }
      decrementUserHealth();
      if (userHealth <= 1) {
        resetUserHealth();
        router.push({
          pathname: "/home/category/stage/[stageId]",
          params: {
            stageId: resetStage,
            lessonId,
            levelId,
            category,
          },
        });
      }
    },
  });
  return nextStage;
};

export default useSubmitAnswer;
