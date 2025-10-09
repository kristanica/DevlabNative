import { auth, URL } from "@/assets/constants/constants";
import tryCatch from "@/assets/Hooks/function/tryCatch";
import axios from "axios";

export const searchUser = async (name: string) => {
  const token = await auth.currentUser?.getIdToken(true);
  console.log(name);
  const [searchedUser, error] = await tryCatch(
    axios.get(`${URL}/fireBaseAdmin/searchUser/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
  if (error) {
    console.log(error);
    return;
  }

  if (searchedUser.status !== 200) {
    console.log(searchedUser.data.message);
    return;
  }

  return searchedUser.data;
};
