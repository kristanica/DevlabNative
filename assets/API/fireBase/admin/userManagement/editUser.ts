import { auth, URL } from "@/assets/constants/constants";
import tryCatch from "@/assets/Hooks/function/tryCatch";
import axios from "axios";

export const editUser = async ({
  uid,
  state,
}: {
  uid: string;
  state: {
    username: string;
    bio: string;
    userLevel: number;
    email: string;
    coins: number; //Will change to number when updating
    exp: number; //Will change to number when updating
  };
}) => {
  const token = await auth.currentUser?.getIdToken(true);
  const [allUserData, error] = await tryCatch(
    axios.post(
      `${URL}/fireBaseAdmin/editUser`,
      {
        uid: uid,
        username: state.username,
        bio: state.bio,
        userLevel: state.userLevel,
        coins: state.coins,
        exp: state.exp,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );

  if (error) {
    console.error("Failed upating user data", error);
    throw error; // React Query will handle this
  }
  console.log("Success!");
  if (allUserData?.status !== 200) {
    console.log("FUCKKERR EDIT USER");
  }

  return allUserData.data;
};
