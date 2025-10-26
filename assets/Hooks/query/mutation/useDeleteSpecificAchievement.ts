import { deleteSpecificAchievement } from "@/assets/API/fireBase/admin/userManagement/deleteSpecificAchievement";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteSpecificAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ uid, category }: { uid: string; category: string }) =>
      deleteSpecificAchievement({ uid, category }),
    onMutate: ({ uid, category }) => {
      queryClient.cancelQueries({ queryKey: ["allUser"] });
      const previousQueryData = queryClient.getQueryData(["allUser"]);
      queryClient.setQueryData(["allUser"], (old: any) => {
        return old.map((user: any) => {
          if (user.id === uid) {
            return {
              ...user,
              achievements: {
                ...user.achievements,
                [category]: {
                  quantity: 0,
                },
              },
            };
          }
          return user;
        });
      });
      return { previousQueryData };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(["allUser"], context?.previousQueryData);
    },
  });
};
