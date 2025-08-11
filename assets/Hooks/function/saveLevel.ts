import { db } from "@/assets/constants/constants";
import levelIdentifier from "@/assets/zustand/levelIdentifier";
import { doc, setDoc } from "firebase/firestore";

const saveLevel = async ({ updateLevelInformation }: any) => {
  const gameLevelIden = levelIdentifier.getState().levelIdentifier;
  try {
    if (!gameLevelIden?.category) {
      throw new Error("Category is undefined");
    }
    const levelRef = doc(
      db,
      gameLevelIden.category,
      gameLevelIden.lessonId,
      "Levels",
      gameLevelIden.levelId
    );

    await setDoc(levelRef, updateLevelInformation, { merge: true });
  } catch (error) {
    throw new Error("Something happened...." + error);
  }
};

export default saveLevel;
