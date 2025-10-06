import claimAchievements from "@/assets/API/clientSide/claimAchievement";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { playSound } from "../../function/soundHandler";

const claimAchievementMutation = () => {
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
      Toast.show({
        type: "claimAchievement",
        visibilityTime: 2000,
        position: "top",
        topOffset: 50,
        text1: String(data!.coinsReward),
        text2: String(data!.expReward),
      });
    },
  });
};

export default claimAchievementMutation;
