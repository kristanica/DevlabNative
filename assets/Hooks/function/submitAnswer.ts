import { userHealthPoints } from "@/assets/zustand/userHealthPoints";
import { router } from "expo-router";
import errorShield from "../mainGameModeFunctions/globalItems/errorShield";

type submitAnswerPayload = {
  stageId: string;
  lessonId: string;
  levelId: string;
  category: string;
};

const submitAnswer = async ({
  stageId,
  lessonId,
  levelId,
  category,
}: submitAnswerPayload) => {
  const { hasShield, consumeErrorShield } = errorShield();
  const decrementUserHealth = userHealthPoints.getState().decrementUserHealth;
  const userHealth = userHealthPoints.getState().health;
  const resetUserHealth = userHealthPoints.getState().resetUserHealth;

  if (hasShield) {
    const isShieldUsed = await consumeErrorShield();
    if (isShieldUsed) {
      return;
    }
  }

  decrementUserHealth();
  if (userHealth <= 1) {
    resetUserHealth();
    router.push({
      pathname: "/home/category/stage/[stageId]",
      params: {
        stageId: stageId,
        lessonId,
        levelId,
        category,
      },
    });
  }
};

export default submitAnswer;
