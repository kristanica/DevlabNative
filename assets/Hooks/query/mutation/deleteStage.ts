import { auth, URL } from "@/assets/constants/constants";
import tracker from "@/assets/zustand/tracker";
import axios from "axios";

const deleteStage = async () => {
  const levelPayload = tracker.getState().levelPayload;
  const stageIdentifier = tracker.getState().stageId;

  if (!levelPayload || !stageIdentifier) {
    return [];
  }

  try {
    const token = await auth.currentUser?.getIdToken(true);
    const res = await axios.post(
      `${URL}/fireBaseAdmin/deleteStage`,
      {
        category: levelPayload?.category,
        lessonId: levelPayload?.lessonId,
        levelId: levelPayload?.levelId,
        stageId: stageIdentifier,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      console.log(res.data.message);
      return res.data;
    }
  } catch (error) {
    console.log("Test" + error);
    return null;
  }
};

export default deleteStage;
// try {
//   // deletes specific stage
//   const specificStageRef = doc(
//     db,
//     levelPayload.category,
//     levelPayload.lessonId,
//     "Levels",
//     levelPayload.levelId,
//     "Stages",
//     stageIdentifier
//   );

//   await deleteDoc(specificStageRef);

//   //Re orders all stages after deletion
//   const stageRef = collection(
//     db,
//     levelPayload.category,
//     levelPayload.lessonId,
//     "Levels",
//     levelPayload.levelId,
//     "Stages"
//   );

//   const queryByOrder = query(stageRef, orderBy("order", "asc"));
//   const snapshot = await getDocs(queryByOrder);

//   const batch = writeBatch(db);

//   snapshot.docs.forEach((item, index) => {
//     batch.update(doc(stageRef, item.id), {
//       order: index + 1,
//     });
//   });

//   await batch.commit();
// } catch (error) {
//   console.log(error);
// }
