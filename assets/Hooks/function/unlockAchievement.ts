import { auth, db } from "@/assets/constants/constants";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Toast from "react-native-toast-message";

export const unlockAchievement = async (
  subject: string,
  actionType: string,
  payload: any
) => {
  const userId = auth.currentUser?.uid;
  try {
    const achievementsRef = doc(db, "Achievements", subject);
    const achivementsSnapShot = await getDoc(achievementsRef);
    if (!achivementsSnapShot.exists()) {
      return null;
    }
    const achievementsData = achivementsSnapShot.data();
    for (const [achievementId, achievement] of Object.entries(
      achievementsData
    )) {
      const condition = achievement?.unlockCondition;
      let match = false;
      switch (actionType) {
        case "firstLevelComplete":
          match =
            condition?.levelId === payload?.LevelId &&
            condition?.lessonId === payload?.lessonId &&
            condition?.subject === subject;
          break;
        case "lessonComplete":
          match = payload.lessonId && condition?.lessonId === payload?.lessonId;
          break;
        case "tagUsed":
          match =
            payload.usedTags?.includes(condition?.tagReq) &&
            payload.isCorrect === true;
          break;
        case "itemUse":
          match =
            payload?.itemName === condition?.itemReq &&
            subject === condition?.subject;
          break;
        case "cssAction":
          match =
            payload?.achievementTitle === condition?.title &&
            condition.subject === subject;
          break;
        case "subjectComplete":
          match =
            condition?.type === "subjectCompletion" &&
            condition?.subject === subject;
          break;
      }
      if (match) {
        const userAchievementRef = doc(
          db,
          "Users",
          String(userId),
          "Achievements",
          achievementId
        );
        const userAchievementSnap = await getDoc(userAchievementRef);
        if (userAchievementSnap.exists()) {
          console.log("already been unlocked!");
          return null;
        }

        await setDoc(userAchievementRef, {
          isClaimed: false,
          coinsReward: achievement.coinsReward,
          expReward: achievement.expReward,
          achievementName: achievement.title,
          dateUnlocked: new Date(),
        });
        Toast.show({
          type: "success",
          text1: "Achievement Unlocked",
          text2: `${achievement?.title}`,
          visibilityTime: 3000,
          position: "top",
          topOffset: 20,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
