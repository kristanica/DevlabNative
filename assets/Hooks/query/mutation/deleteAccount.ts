import { deleteAccount } from "@/assets/API/fireBase/admin/userManagement/deleteAccount";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => deleteAccount(id),
    //Optimistic update for deleting
    onMutate: (deletedId: string) => {
      queryClient.cancelQueries({ queryKey: ["allUser"] });
      const previousQueyData = queryClient.getQueryData(["allUser"]);
      queryClient.setQueryData(["allUser"], (old: any) => {
        if (!old) return;
        return old.filter((item: any) => item.id !== deletedId);
      });
      return { previousQueyData };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousQueyData) {
        queryClient.setQueryData(["allUser"], context?.previousQueyData);
      }
    },
  });
};
