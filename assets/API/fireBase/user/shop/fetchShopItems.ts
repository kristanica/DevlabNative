import { auth, URL } from "@/assets/constants/constants";
import axios from "axios";

export const fetchShopItems = async () => {
  const uid = await auth.currentUser?.getIdToken(true);
  const res = await axios.get(`${URL}/fireBase/Shop`, {
    headers: {
      Authorization: `Bearer ${uid}`,
    },
  });

  return res.data as ingameItemsPayload[];
};
