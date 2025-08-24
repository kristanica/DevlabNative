import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../constants/constants";
import fetchLessonAdmin from "./query/fetchLessonAdmin";

const useLevelEditor = (category: string, lessonId: string) => {
  const queryClient = useQueryClient();
  const {
    data: lessonsData,
    isLoading,
    refetch,
  } = useQuery({
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

        const newLevelNumber = snapshot?.docs.map((item) => {
          const match = item.id.match(/Level (\d+)/);
          return match ? parseInt(match[1]) : 0;
        });

        const nextNumber =
          (newLevelNumber!.length > 0 ? Math.max(...newLevelNumber!) : 0) + 1;

        const newLevelid = `Level${nextNumber}`;

        await setDoc(doc(lessonsRef, newLevelid), {
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
  const addLessonMutation = useMutation({
    mutationFn: async () => {
      try {
        const lessonRef = collection(db, category);
        const newLessonNumber = lessonsData?.map((item) => {
          const match = item.id.match(/Lesson(\d+)/);
          return match ? parseInt(match[1]) : 0;
        });

        const nextNumber =
          (newLessonNumber!.length > 0 ? Math.max(...newLessonNumber!) : 0) + 1;

        const newLessonId = `Lesson${nextNumber}`;
        await setDoc(doc(lessonRef, newLessonId), {
          Lesson: nextNumber,
          createdAt: new Date(),
        });

        await setDoc(doc(lessonRef, newLessonId, "Levels", "Level 1"), {
          Lesson: 1,
          createdAt: new Date(),
        });
      } catch {}
    },
    onSuccess: () => {
      // Refresh the data after adding
      queryClient.invalidateQueries({ queryKey: ["lesson admin", category] });
    },
  });

  return {
    lessonsData,
    isLoading,
    addLevelMutation,
    addLessonMutation,
    refetch,
  };
};

export default useLevelEditor;
