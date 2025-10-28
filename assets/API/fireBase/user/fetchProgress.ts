import tryCatch from "@/assets/Hooks/function/tryCatch";
import { auth, URL } from "@/constants";
import axios from "axios";

export const fetchProgress = async () => {
  const uid = await auth.currentUser?.getIdToken(true);

  const [userProgress, error] = await tryCatch(
    axios.get(`${URL}/fireBase/progress/all`, {
      headers: {
        Authorization: `Bearer ${uid}`,
      },
    })
  );
  if (error) {
    throw error;
  }

  console.log(userProgress.data);
  console.log("USERPROGRESS");

  return userProgress.data;
};
