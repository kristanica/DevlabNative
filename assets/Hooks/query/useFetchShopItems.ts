import { auth } from "@/assets/constants/constants";
import { useQuery } from "@tanstack/react-query";

type ItemType = {
  id: string;
  Icon: string;
  cost: number;
  desc: string;
  title: string;
};

const useFetchShopItems = () => {
  const { data: shopItems } = useQuery({
    queryKey: ["ShopItems"],
    queryFn: async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        return null;
      }
      const token = await currentUser?.getIdToken(true);

      try {
        const res = await fetch(
          `https://83a4e769b3c4.ngrok-free.app/fireBase/Shop`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          console.log(
            "Something went wrong when fetching shop items..." + res.status
          );
          return null;
        }

        const data: ItemType[] = await res.json();

        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  });

  return { shopItems };
};

export default useFetchShopItems;
