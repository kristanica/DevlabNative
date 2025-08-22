import { db } from "@/assets/constants/constants";
import tracker from "@/assets/zustand/tracker";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  writeBatch,
} from "firebase/firestore";

const deleteStage = async () => {
  const levelPayload = tracker.getState().levelPayload;
  const stageIdentifier = tracker.getState().stageId;

  if (!levelPayload || !stageIdentifier) {
    return [];
  }

  try {
    // deletes specific stage
    const specificStageRef = doc(
      db,
      levelPayload.category,
      levelPayload.lessonId,
      "Levels",
      levelPayload.levelId,
      "Stages",
      stageIdentifier
    );

    await deleteDoc(specificStageRef);

    //Re orders all stages after deletion
    const stageRef = collection(
      db,
      levelPayload.category,
      levelPayload.lessonId,
      "Levels",
      levelPayload.levelId,
      "Stages"
    );

    const queryByOrder = query(stageRef, orderBy("order", "asc"));
    const snapshot = await getDocs(queryByOrder);

    const batch = writeBatch(db);

    snapshot.docs.forEach((item, index) => {
      batch.update(doc(stageRef, item.id), {
        order: index + 1,
      });
    });

    await batch.commit();
  } catch (error) {
    console.log(error);
  }
};

export default deleteStage;
