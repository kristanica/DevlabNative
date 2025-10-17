import { deleteAccount } from "@/assets/API/fireBase/admin/userManagement/deleteAccount";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => deleteAccount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUser"] });
    },
  });
};
