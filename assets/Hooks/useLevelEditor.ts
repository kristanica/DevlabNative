import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { auth, URL } from "../constants/constants";
import tracker from "../zustand/tracker";
type levelDataType = {
  title: string;
  description: string;
  coinsReward: number;
  expReward: number;
};
const useLevelEditor = () => {
  const payload = tracker((state) => state.levelPayload);
  const queryClient = useQueryClient();
  const { data: levelData } = useQuery({
    queryKey: [
      "specificLevelData",
      payload?.category,
      payload?.lessonId,
      payload?.levelId,
    ],
    queryFn: async () => {
      const token = await auth.currentUser?.getIdToken(true);
      if (!payload) {
        return null;
      }

      try {
        const res = await axios.get(
          `${URL}/fireBaseAdmin/specificLevelData/${payload.category}/${payload.lessonId}/${payload.levelId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status !== 200) {
          console.log(
            "Something went wrong when retriveing specfic level data"
          );
          return;
        }
        console.log(res.data);
        return res.data as levelDataType;
      } catch {
        return null;
      }
    },
  });

  const updateLevelMutation = useMutation({
    mutationFn: async ({ state }: { state: any }) => {
      const token = await auth.currentUser?.getIdToken(true);
      try {
        const res = await axios.post(
          `${URL}/fireBaseAdmin/editLevel`,
          {
            category: payload?.category,
            lessonId: payload?.lessonId,
            levelId: payload?.levelId,
            state: state,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status !== 200) {
          console.log("Something went wrong went updating the level");
          return;
        }

        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lesson admin", payload?.category],
      });
    },
  });
  const deleteLevelMutation = useMutation({
    mutationFn: async () => {
      const token = await auth.currentUser?.getIdToken(true);

      try {
        const res = await axios.post(
          `${URL}/fireBaseAdmin/deleteLevel`,
          {
            category: payload?.category,
            lessonId: payload?.lessonId,
            levelId: payload?.levelId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status !== 200) {
          console.log("Something went wrong when deleting specfic level data");
          return;
        }
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lesson admin", payload?.category],
      });
    },
  });
  return { levelData, updateLevelMutation, deleteLevelMutation };
};
export default useLevelEditor;
