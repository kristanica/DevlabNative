import { db } from "@/assets/constants/constants";
import tracker from "@/assets/zustand/tracker";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

type StageDataProps = {
  id: string;
  title: string;
  description: string;
  type: "lesson" | "game";
  isHidden?: boolean;
};

const ListStages = async () => {
  const levelPayload = tracker.getState().levelPayload;

  if (!levelPayload) {
    return [];
  }
  try {
    const stagesRef = collection(
      db,
      levelPayload.category,
      levelPayload.lessonId,
      "Levels",
      levelPayload.levelId,
      "Stages"
    );
    const stagesQuery = query(stagesRef, orderBy("order", "asc"));
    const stagesDocs = await getDocs(stagesQuery);
    const stagesData = stagesDocs.docs.map((doc) => {
      return {
        id: doc.id,
        ...(doc.data() as Omit<StageDataProps, "id">),
      };
    });

    return stagesData;
  } catch (error) {
    return [];
  }
};

export default ListStages;
