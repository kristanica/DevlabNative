import claimAchievements from "@/assets/API/clientSide/claimAchievement";
import toastHandler from "@/assets/zustand/toastHandler";
import { useMutation } from "@tanstack/react-query";
import { playSound } from "../../function/soundHandler";

const claimAchievementMutation = () => {
  const setToastVisibility = toastHandler.getState().setToastVisibility;
  return useMutation({
    mutationFn: async ({
      achievementId,
      expReward,
      coinsReward,
    }: ClaimAchievementsPayload) =>
      claimAchievements({ achievementId, expReward, coinsReward }),
    onSuccess: async (data) => {
      console.log(data);
      await playSound("achievementUnlocked");
      setToastVisibility("success", `You've uncloked an achievement!`);
    },
  });
};

export default claimAchievementMutation;
