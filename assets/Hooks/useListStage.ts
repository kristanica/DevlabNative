import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { auth, URL } from "../constants/constants";
import tracker from "../zustand/tracker";
import ListStages from "./query/ListStages";

const useListStage = () => {
  const levelPayload = tracker((state) => state.levelPayload);

  const queryClient = useQueryClient();
  const { data: stagesData, isLoading } = useQuery({
    queryKey: [
      "Stages",
      levelPayload?.category,
      levelPayload?.lessonId,
      levelPayload?.levelId,
    ],
    queryFn: () => ListStages(),
    enabled: !!(
      levelPayload?.category &&
      levelPayload?.lessonId &&
      levelPayload?.levelId
    ),
  });

  const addNewStageMutation = useMutation({
    mutationFn: async () => {
      const token = await auth.currentUser?.getIdToken(true);
      if (!levelPayload) {
        return;
      }
      const res = await axios.post(
        `${URL}/fireBaseAdmin/addStage`,
        {
          category: levelPayload.category,
          lessonId: levelPayload.lessonId,
          levelId: levelPayload.levelId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        console.log("wow sucess");
        return res.data;
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [
          "Stages",
          levelPayload?.category,
          levelPayload?.lessonId,
          levelPayload?.levelId,
        ],
      }),
  });

  const updateOrderMutation = useMutation({
    mutationFn: async ({ newOrder }: { newOrder: any }) => {
      const token = await auth.currentUser?.getIdToken(true);
      if (!levelPayload) {
        return;
      }

      const res = await axios.post(
        `${URL}/fireBaseAdmin/updateOrder`,
        {
          newOrderData: newOrder,
          category: levelPayload.category,
          lessonId: levelPayload.lessonId,
          levelId: levelPayload.levelId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        console.log("updated order");
        return res.data;
      }
    },
  });

  return { stagesData, addNewStageMutation, updateOrderMutation, isLoading };
};

export default useListStage;
