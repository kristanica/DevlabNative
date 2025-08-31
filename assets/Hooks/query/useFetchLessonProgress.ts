import { auth, db } from "@/assets/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { useFetchLessonWEB } from "./useFetchLessonListWEB";

type progressMap = Record<string, boolean>;
const useFetchLessonProgress = (category: string) => {
  const { lessonFromWeb, lessonFromWebLoading } = useFetchLessonWEB(category);

  const { data: lessonWithProgress, isLoading } = useQuery({
    queryKey: ["userProgress_data", category, lessonFromWeb],
    queryFn: async () => {
      const userId = auth.currentUser?.uid;
      const allProgress: progressMap = {};
      const allStages: progressMap = {};
      let completedLevels = 0;
      let completedStages = 0;

      if (!lessonFromWeb)
        return { allProgress, allStages, completedLevels, completedStages };
      if (!userId || !category) return null;
      for (const lesson of lessonFromWeb) {
        const lessonId = lesson.id;
        if (!lessonId) return null;
        const levelsRef = collection(
          db,
          "Users",
          userId,
          "Progress",
          category,
          "Lessons",
          lessonId,
          "Levels"
        );
        const levelsSnap = await getDocs(levelsRef);

        for (const levelDoc of levelsSnap.docs) {
          const levelId = levelDoc.id;
          const status = levelDoc.data().status;
          allProgress[`${lessonId}-${levelId}`] = status;

          if (status === true) completedLevels += 1;

          // Fetch Stages inside this Level
          const stagesRef = collection(
            db,
            "Users",
            userId,
            "Progress",
            category,
            "Lessons",
            lessonId,
            "Levels",
            levelId,
            "Stages"
          );
          const stagesSnap = await getDocs(stagesRef);

          stagesSnap.forEach((stageDoc) => {
            const stageStatus = stageDoc.data().status;
            allStages[`${lessonId}-${levelId}-${stageDoc.id}`] = stageStatus;
            if (stageStatus === true) completedStages += 1;
          });
        }
      }

      return { allProgress, allStages, completedLevels, completedStages };
    },

    enabled: !!lessonFromWeb,
  });
  return { lessonWithProgress, isLoading };
};

export default useFetchLessonProgress;
