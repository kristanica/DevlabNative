import tryCatch from "@/assets/Hooks/function/tryCatch";
import { auth, URL } from "@/constants";
import axios from "axios";

export const suspendAccount = async (id: string, toggleDisable: boolean) => {
  const token = await auth.currentUser?.getIdToken(true);

  const [data, error] = await tryCatch(
    axios.post(
      `${URL}/fireBaseAdmin/suspendAccount`,
      {
        uid: id,
        toggleDisable: toggleDisable,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );

  if (error) {
    console.log(error + "error suspendAccount");
    return;
  }

  return data.data;
};
