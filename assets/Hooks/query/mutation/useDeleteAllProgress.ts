import { deleteAllProgress } from "@/assets/API/fireBase/admin/userManagement/deleteAllProgress";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteAllProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ uid }: { uid: string }) => deleteAllProgress(uid),
    onMutate: ({ uid }) => {
      queryClient.cancelQueries({ queryKey: ["allUser"] });
      const previousQueryData = queryClient.getQueryData(["allUser"]);
      queryClient.setQueryData(["allUser"], (old: any) => {
        return old.map((user: any) => {
          if (user.id === uid) {
            return {
              ...user,
              levelCount: {
                ...user.levelCount,
                Database: 0,
                Html: 0,
                Css: 0,
                JavaScript: 0,
              },
            };
          }
          return user;
        });
      });
      return { previousQueryData };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["allUser"] });
    },
  });
};
