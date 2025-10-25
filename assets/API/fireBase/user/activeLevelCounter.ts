import tryCatch from "@/assets/Hooks/function/tryCatch";
import { auth, URL } from "@/constants";
import axios from "axios";

export const activeLevelCounter = async () => {
  const token = await auth.currentUser?.getIdToken(true);

  const [data, error] = await tryCatch(
    axios.get(`${URL}/fireBase/levelCount`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );

  if (error) {
    console.log(`${error} from activeLevelCounter`);
    return;
  }
  console.log("active level has been prefetched!");
  return data.data;
};
