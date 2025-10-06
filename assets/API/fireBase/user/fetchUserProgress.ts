import { auth, URL } from "@/assets/constants/constants";
import axios from "axios";

export const userProgress = async () => {
  const uid = await auth.currentUser?.getIdToken(true);
  const res = await axios.get(`${URL}/fireBase/userProgress`, {
    headers: {
      Authorization: `Bearer ${uid}`,
    },
  });
  return res.data;
};
