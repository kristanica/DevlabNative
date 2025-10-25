import tryCatch from "@/assets/Hooks/function/tryCatch";
import { auth, URL } from "@/constants";
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
  console.log(data.data);
  return data.data;
};
