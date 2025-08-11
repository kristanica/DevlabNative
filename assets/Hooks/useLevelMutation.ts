import { useMutation, useQueryClient } from "@tanstack/react-query";
import levelIdentifier from "../zustand/levelIdentifier";
import saveLevel from "./function/saveLevel";

const useLevelMutation = () => {
  const gameLevelIden = levelIdentifier.getState().levelIdentifier;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ updateLevelInformation }: any) =>
      saveLevel({ updateLevelInformation }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "level",
          gameLevelIden?.category,
          gameLevelIden?.lessonId,
          gameLevelIden?.levelId,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: ["lesson admin", gameLevelIden?.category],
      });
    },
  });
  return mutation;
};

export default useLevelMutation;
