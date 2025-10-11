import claimAchievements from "@/assets/API/clientSide/claimAchievement";
import toastHandler from "@/assets/zustand/toastHandler";
import { useMutation } from "@tanstack/react-query";

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

      setToastVisibility("success", `You've claimed an achievement!`);
    },
  });
};

export default claimAchievementMutation;
