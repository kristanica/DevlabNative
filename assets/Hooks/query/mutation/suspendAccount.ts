import { suspendAccount } from "@/assets/API/fireBase/admin/userManagement/suspendAccount";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSuspendAccount = ({ onMutate, onSettled }: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      toggleDisable,
    }: {
      id: string;
      toggleDisable: boolean;
    }) => suspendAccount(id, toggleDisable),

    onSuccess: (data) => {
      queryClient.cancelQueries({ queryKey: ["allUser"] });
      const previousQueryData = queryClient.getQueryData(["allUser"]);

      queryClient.setQueryData(["allUser"], (old: any) => {
        return old?.map((user: any) => {
          return user.id === data.uid
            ? { ...user, isAccountSuspended: data.isAccountSuspended }
            : user;
        });
      });
      return { previousQueryData };
    },
    onMutate,
    onSettled,
  });
};
