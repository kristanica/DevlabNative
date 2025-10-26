import tryCatch from "@/assets/Hooks/function/tryCatch";
import { auth, URL } from "@/constants";
import axios from "axios";

export const deleteSpecificAchievement = async ({
  category,
  uid,
}: {
  category: string;
  uid: string;
}) => {
  console.log(category + "!!!!!!!!!!");
  const token = await auth.currentUser?.getIdToken(true);
  const [data, error] = await tryCatch(
    axios.delete(`${URL}/fireBaseAdmin/deleteAchievement`, {
      data: {
        category: category,
        uid: uid,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );

  if (error) {
    console.log(error);
    throw error;
  }
  console.log(data.data);

  return data.data;
};
