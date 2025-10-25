import tryCatch from "@/assets/Hooks/function/tryCatch";
import { auth, URL } from "@/constants";
import axios from "axios";

const purchaseItem = async ({
  id,
  cost,
  itemIcon,
  itemName,
}: purchaseItemPayload) => {
  const token = await auth.currentUser?.getIdToken(true);

  const [res, error] = await tryCatch(
    axios.post(
      `${URL}/fireBase/purchaseItem`,
      {
        itemId: id,
        itemCost: cost,
        itemName: itemName,
        itemIcon: itemIcon,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );

  if (error) {
    throw new Error(String(error));
  }

  if (res?.status !== 200) {
    console.log("Purchase unsuccessful:", res?.data);
    return;
  }

  return res.data;
};

export default purchaseItem;
