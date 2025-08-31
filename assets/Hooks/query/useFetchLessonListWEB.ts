import { db } from "@/assets/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

export const useFetchLessonWEB = (category: string) => {
  const { data: lessonFromWeb, isLoading: lessonFromWebLoading } = useQuery({
    queryKey: ["lesson_dataWEB", category],
    queryFn: async () => {
      const lessonsRef = collection(db, category);
      const lessonSnapshot = await getDocs(lessonsRef);

      const lessons = await Promise.all(
        lessonSnapshot.docs.map(async (lessonDoc) => {
          const levelsRef = collection(db, category, lessonDoc.id, "Levels");
          const levelsSnapshot = await getDocs(levelsRef);

          const levels = await Promise.all(
            levelsSnapshot.docs.map(async (levelDoc) => {
              const stagesRef = collection(
                db,
                category,
                lessonDoc.id,
                "Levels",
                levelDoc.id,
                "Stages"
              );
              const stagesSnapshot = await getDocs(stagesRef);

              const stages = stagesSnapshot.docs.map((stageDoc) => ({
                id: stageDoc.id,
                ...stageDoc.data(),
              }));

              return {
                id: levelDoc.id,
                ...levelDoc.data(),
                stages,
              };
            })
          );

          return {
            id: lessonDoc.id,
            ...lessonDoc.data(),
            levels,
          };
        })
      );

      return lessons;
    },
  });

  return { lessonFromWeb, lessonFromWebLoading };
};
