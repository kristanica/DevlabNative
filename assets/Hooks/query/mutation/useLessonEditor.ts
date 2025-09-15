import addLesson from "@/assets/API/fireBase/admin/lesson/addLesson";
import addLevel from "@/assets/API/fireBase/admin/lesson/addLevel";
import deleteLesson from "@/assets/API/fireBase/admin/lesson/deleteLesson";
import fetchLessonsForAdmin from "@/assets/API/fireBase/admin/lesson/fetchLessonsForAdmin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useLessonEditor = (
  category: string,
  lessonId: string,
  lessonIdDeletion: string
) => {
  const queryClient = useQueryClient();
  const {
    data: lessonsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["lesson admin", category],
    queryFn: async () => {
      return fetchLessonsForAdmin(category);
    },
  });
  const addLevelMutation = useMutation({
    mutationFn: async () => {
      return await addLevel(category, lessonId);
    },
    onSuccess: () => {
      // Refresh the data after adding
      queryClient.invalidateQueries({ queryKey: ["lesson admin", category] });
    },
  });
  const addLessonMutation = useMutation({
    mutationFn: async () => {
      return await addLesson(category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lesson admin", category] });
    },
  });

  const deleteLessonMutation = useMutation({
    mutationFn: async () => {
      await deleteLesson(category, lessonIdDeletion);
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
    deleteLessonMutation,
    refetch,
  };
};

export default useLessonEditor;
