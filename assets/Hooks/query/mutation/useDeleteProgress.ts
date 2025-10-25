import { deleteSpecificProgress } from "@/assets/API/fireBase/admin/userManagement/deleteSpecificProgress";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ uid, subject }: { uid: string; subject: string }) =>
      deleteSpecificProgress(uid, subject),
    onMutate: ({ uid, subject }) => {
      queryClient.cancelQueries({ queryKey: ["allUser"] });
      const previousQueryData = queryClient.getQueryData(["allUser"]);
      queryClient.setQueryData(["allUser"], (old: any) => {
        return old.map((user: any) => {
          if (user.id === uid) {
            return {
              ...user,
              levelCount: {
                ...user.levelCount,
                [subject]: 0,
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
