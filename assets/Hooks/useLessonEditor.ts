import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { auth } from "../constants/constants";
const URL = "https://911de444c48e.ngrok-free.app";
const useLevelEditor = (
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
      try {
        const currentUser = auth.currentUser;
        const token = await currentUser?.getIdToken(true);
        const res = await axios.get(`${URL}/fireBaseAdmin/getAll/${category}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    staleTime: 1000 * 60 * 5,
  });
  const addLevelMutation = useMutation({
    mutationFn: async () => {
      const currentUser = auth.currentUser;
      const token = await currentUser?.getIdToken(true);
      console.log(category, lessonId);
      try {
        const res = await axios.post(
          `https://911de444c48e.ngrok-free.app/fireBaseAdmin/addLevel`,
          {
            category,
            lessonId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      // Refresh the data after adding
      queryClient.invalidateQueries({ queryKey: ["lesson admin", category] });
    },
  });
  const addLessonMutation = useMutation({
    mutationFn: async () => {
      const currentUser = auth.currentUser;
      const token = await currentUser?.getIdToken(true);
      console.log(category, lessonId);
      try {
        const res = await axios.post(
          `https://911de444c48e.ngrok-free.app/fireBaseAdmin/addLesson`,
          {
            category,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lesson admin", category] });
    },
  });

  const deleteLessonMutation = useMutation({
    mutationFn: async () => {
      const currentUser = auth.currentUser;
      const token = await currentUser?.getIdToken(true);
      try {
        const res = await axios.post(
          "https://911de444c48e.ngrok-free.app/fireBaseAdmin/deleteLessons",
          {
            category,
            lessonId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return res.data;
      } catch (error) {
        console.log(error);
      }
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

export default useLevelEditor;
