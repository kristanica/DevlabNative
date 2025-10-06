import { auth } from "@/assets/constants/constants";
import axios from "axios";

type ItemType = {
  id: string;
  Icon: string;
  cost: number;
  desc: string;
  title: string;
};
export const fetchShopItems = async () => {
  const uid = await auth.currentUser?.getIdToken(true);
  const res = await axios.get(
    `https://3916a0727333.ngrok-free.app/fireBase/Shop`,
    {
      headers: {
        Authorization: `Bearer ${uid}`,
      },
    }
  );

  return res.data as ItemType[];
};
