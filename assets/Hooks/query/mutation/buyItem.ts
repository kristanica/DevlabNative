import purchaseItem from "@/assets/API/fireBase/user/purchaseItem";
import { useMutation } from "@tanstack/react-query";

const buyItem = async () => {
  return useMutation({
    mutationFn: async ({ id, cost }: { id: string; cost: number }) =>
      purchaseItem({
        id: id,
        cost: cost,
      }),
  });
};

export default buyItem;
