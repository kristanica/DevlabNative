import { db } from "@/assets/constants/constants";
import { collection, getDocs } from "firebase/firestore";

type fetchLessonProps = {
  category: string;
};

export const useFetchLessonList = async ({ category }: fetchLessonProps) => {
  try {
    const Lessonref = collection(db, category);
    const data = await getDocs(Lessonref);
    const lessonData = await Promise.all(
      //any is not FINAL
      data.docs.map(async (lessonDoc: any) => {
        const levelRef = collection(db, category, lessonDoc.id, "Levels");
        const data = await getDocs(levelRef);

        const levelData = await Promise.all(
          //any is not FINAL
          data.docs.map(async (levelDoc: any) => ({
            id: levelDoc.id,
            ...levelDoc.data(),
          }))
        );
        return {
          id: lessonDoc.id,
          ...lessonDoc.data(),
          levels: levelData,
        };
      })
    );
    return lessonData;
  } catch (error) {
    console.log("Error when fetching lessons...." + error);
    throw new Error("Failed fething lessons");
  }
};
