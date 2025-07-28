import { db } from "@/assets/constants/constants";
import gameIdentifier from "@/assets/zustand/gameIdentifier";
import { doc, setDoc } from "firebase/firestore";

const saveTopic = async (state: any, type: any) => {
  const gameIdenData = gameIdentifier.getState().data;
  try {
    if (gameIdenData) {
      const gameModeRef = doc(
        db,
        gameIdenData?.subject,
        gameIdenData?.lessonId,
        "Levels",
        gameIdenData?.levelId,
        "Topics",
        gameIdenData?.topicId,
        "Gamemodes",
        type
      );
      console.log(type);
      await setDoc(gameModeRef, state, { merge: true });
    }
  } catch (error) {
    console.log(error);
  }
};

export default saveTopic;
