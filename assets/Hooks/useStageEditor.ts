import { useMutation, useQueryClient } from "@tanstack/react-query";
import tracker from "../zustand/tracker";
import customQuery from "./function/customQuery";
import getStageData from "./query/getStageData";
import deleteStage from "./query/mutation/deleteStage";
import editStage from "./query/mutation/editStage";

const useStageEditor = () => {
  const queryClient = useQueryClient();
  const levelPayload = tracker((state) => state.levelPayload);
  const stageIdentifier = tracker((state) => state.stageId);

  if (!levelPayload || !stageIdentifier) {
    return { stageData: undefined, mutation: undefined };
  }
  const { data: stageData } = customQuery(
    [
      "stage",
      levelPayload.category,
      levelPayload.lessonId,
      levelPayload.levelId,
      stageIdentifier,
    ],
    getStageData
  );

  const mutation = useMutation({
    mutationFn: async ({
      state,
      stageType,
    }: {
      state: any;
      stageType: string;
    }) => editStage(state, stageType),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "stage",
          levelPayload?.category,
          levelPayload?.lessonId,
          levelPayload?.levelId,
          stageIdentifier,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "Stages",
          levelPayload?.category,
          levelPayload?.lessonId,
          levelPayload?.levelId,
        ],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => deleteStage(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "Stages",
          levelPayload?.category,
          levelPayload?.lessonId,
          levelPayload?.levelId,
        ],
      });
    },
  });

  return { stageData, mutation, deleteMutation };
};

export default useStageEditor;
