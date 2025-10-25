import tryCatch from "@/assets/Hooks/function/tryCatch";
import { auth, URL } from "@/constants";
import axios from "axios";

export const suspendUser = async ({ id, isSuspended }: suspendUserPayload) => {
  const token = await auth.currentUser?.getIdToken(true);
  const [data, error] = await tryCatch(
    axios.post(
      `${URL}/fireBaseAdmin/suspendUser`,
      {
        id: id,
        isSuspended: isSuspended,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );

  if (error) {
    console.log(data);
    console.log(`Client did not reach the backend ${error.message}`);
    return;
  }
};
