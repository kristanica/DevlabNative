import { auth, URL } from "@/assets/constants/constants";
import tryCatch from "@/assets/Hooks/function/tryCatch";
import axios from "axios";

export const deleteSpecificProgress = async (uid: string, subject: string) => {
  const token = await auth?.currentUser?.getIdToken(true);

  const [data, error] = await tryCatch(
    axios.post(
      `${URL}/fireBaseAdmin/progress/reset`,
      {
        uid: uid,
        subject: subject,
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
