import { auth, URL } from "@/assets/constants/constants";
import tryCatch from "@/assets/Hooks/function/tryCatch";
import axios from "axios";

export const deleteAccount = async (id: string) => {
  const token = await auth.currentUser?.getIdToken(true);

  const [data, error] = await tryCatch(
    axios.post(
      `${URL}/fireBaseAdmin/deleteUser`,
      {
        uid: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );

  if (error) {
    console.log(error + " deleteUser");
    return;
  }

  console.log(data.data.message);
  return;
};
