import toastHandler from "@/assets/zustand/toastHandler";
import { useAchievementStore } from "@/assets/zustand/useAchievementStore";
import { auth, db } from "@/constants";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { playSound } from "./soundHandler";

export const unlockAchievement = async (
  subject: string,
  actionType: string,
  payload: any
) => {
  const userId = auth.currentUser?.uid;
  const achievementStore = useAchievementStore.getState().achievementStore;
  const setToastVisibility = toastHandler.getState().setToastVisibility;
  try {
    for (const achievement of achievementStore[subject]) {
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
          achievement.id
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
        setToastVisibility("success", "You've unlocked an Achievement!");
        await playSound("achievementUnlocked");
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
