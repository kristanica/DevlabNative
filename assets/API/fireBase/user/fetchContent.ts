import { auth, URL } from "@/assets/constants/constants";
import tryCatch from "@/assets/Hooks/function/tryCatch";
import axios from "axios";

export const fetchContent = async (category: string): Promise<any> => {
  const token = await auth.currentUser?.getIdToken(true);
  const [data, error] = await tryCatch(
    axios.get(`${URL}/fireBase/getAllData/${category}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );

  if (error) {
    throw error;
  }

  return data.data;
};
