import { db, filters } from "@/assets/constants/constants";
import tracker from "@/assets/zustand/tracker";
import { deleteField, doc, FieldValue, setDoc } from "firebase/firestore";

const editStage = async (state: any, stageType: string) => {
  const levelPayload = tracker.getState().levelPayload;
  const stageIdentifier = tracker.getState().stageId;

  try {
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

      let filteredState = state;
      let filterDelete: Record<string, FieldValue> = {};

      const setFilter = filters[state.type ? state.type : stageType];

      if (setFilter.omit) {
        filteredState = Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !setFilter.omit!.includes(key)
          )
        );
        setFilter.omit.forEach((key) => {
          filterDelete[key] = deleteField();
        });
      }

      if (setFilter.toNumber) {
        filteredState = setFilter.toNumber(filteredState);
      }
      await setDoc(
        stageRef,
        {
          ...filteredState,
          ...filterDelete,
          type: state.type ? state.type : stageType,
        },
        { merge: true }
      );
    } catch {}
  } catch {
    throw new Error("Something went wwrong...");
  }
};

export default editStage;
