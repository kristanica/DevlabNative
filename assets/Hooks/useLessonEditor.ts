import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../constants/constants";
import fetchLessonAdmin from "./query/fetchLessonAdmin";

const useLessonEditor = (category: string, lessonId: string) => {
  const queryClient = useQueryClient();
  const { data: lessonsData, isLoading } = useQuery({
    queryKey: ["lesson admin", category],
    queryFn: () => fetchLessonAdmin(category),
  });
  const addLevelMutation = useMutation({
    mutationFn: async () => {
      if (!lessonsData) {
        return [];
      }
      try {
        const lessonsRef = collection(db, category, lessonId, "Levels");

        const snapshot = await getDocs(lessonsRef);

        const newLessonNumber = snapshot?.docs.map((item) => {
          const match = item.id.match(/Level (\d+)/);
          return match ? parseInt(match[1]) : 0;
        });

        console.log(newLessonNumber);
        const nextNumber =
          (newLessonNumber!.length > 0 ? Math.max(...newLessonNumber!) : 0) + 1;

        const newLessonId = `Level ${nextNumber}`;

        await setDoc(doc(lessonsRef, newLessonId), {
          Lesson: nextNumber,
          createdAt: new Date(),
        });
      } catch {
        return [];
      }
    },
    onSuccess: () => {
      // Refresh the data after adding
      queryClient.invalidateQueries({ queryKey: ["lesson admin", category] });
    },
  });

  return { lessonsData, isLoading, addLevelMutation };
};

export default useLessonEditor;
