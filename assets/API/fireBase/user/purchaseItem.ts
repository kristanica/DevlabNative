import { auth, URL } from "@/assets/constants/constants";
import tryCatch from "@/assets/Hooks/function/tryCatch";
import axios from "axios";

const purchaseItem = async ({
  id,
  cost,
  itemName,
}: {
  id: string;
  cost: number;
  itemName: string;
}) => {
  const token = await auth.currentUser?.getIdToken(true);

  const [res, error] = await tryCatch(
    axios.post(
      `${URL}/fireBase/purchaseItem`,
      {
        itemId: id,
        itemCost: cost,
        itemName: itemName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );

  if (error) {
    console.log("Purchase failed:", error);
    return;
  }

  if (res?.status !== 200) {
    console.log("Purchase unsuccessful:", res?.data);
    return;
  }

  return res.data;
};

export default purchaseItem;
