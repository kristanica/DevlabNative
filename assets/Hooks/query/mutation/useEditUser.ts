import { editUser } from "@/assets/API/fireBase/admin/userManagement/editUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      uid,
      state,
    }: {
      uid: string;
      state: {
        username: string;
        bio: string;
        userLevel: number;
        email: string;
        coins: number; //Will change to number when updating
        exp: number; //Will change to number when updating
      };
    }) => editUser({ uid, state }),
    onMutate: ({ uid, state }) => {
      queryClient.cancelQueries({ queryKey: ["allUser"] });
      const previousQueryData = queryClient.getQueryData(["allUser"]);
      queryClient.setQueryData(["allUser"], (old: any) => {
        return old.map((user: any) => {
          if (user.id === uid) {
            return {
              ...user,
              ...state,
            };
          }
          return user;
        });
      });
      return { previousQueryData };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousQueryData) {
        queryClient.setQueryData(["allUser"], context?.previousQueryData);
      }
    },
  });
};
