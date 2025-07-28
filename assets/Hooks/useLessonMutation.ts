import { useMutation, useQueryClient } from "@tanstack/react-query";
import gameIdentifier from "../zustand/gameIdentifier";
import saveTopic from "./function/saveTopic";

const useLessonMuation = () => {
  const gameIdenData = gameIdentifier.getState().data;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ state, type }: { state: any; type: any }) =>
      saveTopic(state, type),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [
          "gamemode",
          gameIdenData?.gameCategory,
          gameIdenData?.topicId,
        ],
      }),
  });

  return mutation;
};
export default useLessonMuation;
