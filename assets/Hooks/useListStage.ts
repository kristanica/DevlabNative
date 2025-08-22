import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../constants/constants";
import tracker from "../zustand/tracker";
import ListStages from "./query/ListStages";

const useListStage = () => {
  const levelPayload = tracker((state) => state.levelPayload);

  const queryClient = useQueryClient();
  const { data: stagesData } = useQuery({
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
      if (!levelPayload) {
        return;
      }
      const newStageNumber = stagesData?.map((item) => {
        const match = item.id.match(/Stage (\d+)/);

        return match ? parseInt(match[1]) : 0;
      });
      const nextNumber =
        (newStageNumber!.length > 0 ? Math.max(...newStageNumber!) : 0) + 1;
      const newStageId = `Stage ${nextNumber}`;
      const stagesRef = collection(
        db,
        levelPayload.category,
        levelPayload.lessonId,
        "Levels",
        levelPayload.levelId,
        "Stages"
      );
      await setDoc(doc(stagesRef, newStageId), {
        title: newStageId,
        createdAt: new Date(),
        order: nextNumber,
      });
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
      if (!levelPayload) {
        return;
      }
      const stagesRef = collection(
        db,
        levelPayload.category,
        levelPayload.lessonId,
        "Levels",
        levelPayload.levelId,
        "Stages"
      );

      const snapshot = newOrder.map((item: any) => {
        setDoc(doc(stagesRef, item.id), { order: item.order }, { merge: true });
      });
      await Promise.all(snapshot);
    },
  });

  return { stagesData, addNewStageMutation, updateOrderMutation };
};

export default useListStage;
