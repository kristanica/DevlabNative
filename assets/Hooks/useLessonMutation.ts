import { useMutation, useQueryClient } from "@tanstack/react-query";
import saveTopic from "../deprecated/function/saveTopic";
import gameIdentifier from "../zustand/gameIdentifier";

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
