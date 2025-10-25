import tryCatch from "@/assets/Hooks/function/tryCatch";
import { auth, URL } from "@/constants";
import axios from "axios";

export const deleteAllProgress = async (uid: string) => {
  const token = await auth?.currentUser?.getIdToken(true);
  const [data, error] = await tryCatch(
    axios.post(
      `${URL}/fireBaseAdmin/reset`,
      {
        uid: uid,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );
  if (error) {
    throw error;
  }
  console.log(data.data + "deleteSpeciifcProgress");
  return data.data;
};
