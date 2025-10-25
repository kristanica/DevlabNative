import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { db } from "@/constants";
import { doc, increment, setDoc } from "firebase/firestore";

const claimAchievements = async ({
  achievementId,
  coinsReward,
  expReward,
}: ClaimAchievementsPayload) => {
  const uid = useGetUserInfo.getState().userUid;
  const achievementRef = doc(db, "Users", uid, "Achievements", achievementId);
  const userRef = doc(db, "Users", uid);
  await setDoc(
    userRef,
    {
      exp: increment(expReward),
      coins: increment(coinsReward),
    },
    {
      merge: true,
    }
  );

  await setDoc(
    achievementRef,
    {
      isClaimed: true,
    },
    {
      merge: true,
    }
  );

  return { expReward, coinsReward };
};

export default claimAchievements;
