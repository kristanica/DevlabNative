import { db } from "@/assets/constants/constants";
import tracker from "@/assets/zustand/tracker";
import { doc, getDoc } from "firebase/firestore";

const getStageData = async () => {
  const levelPayload = tracker.getState().levelPayload;
  const stageIdentifier = tracker.getState().stageId;
  if (!levelPayload || !stageIdentifier) {
    throw new Error("Something went wrong with the payload");
  }

  try {
    const stageRef = doc(
      db,
      levelPayload.category,
      levelPayload.lessonId,
      "Levels",
      levelPayload.levelId,
      "Stages",
      stageIdentifier
    );

    const stageData = await getDoc(stageRef);
    if (!stageData.exists()) {
      throw new Error("Data does not exist");
    }

    return stageData.data();
  } catch {}
};

export default getStageData;
