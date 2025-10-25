import { auth, URL } from "@/assets/constants/constants";
import tryCatch from "@/assets/Hooks/function/tryCatch";
import axios from "axios";

export const fetchUsers = async () => {
  const token = await auth.currentUser?.getIdToken(true);
  const [allUserData, error] = await tryCatch(
    axios.get(`${URL}/fireBaseAdmin/getUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );

  if (error) {
    console.error("Failed to fetch users:", error);
    throw error; // React Query will handle this
  }
  console.log("Success!");
  if (allUserData?.status !== 200) {
    console.log(
      "This errror comes from fetchUsers function. The client reached the backend but failed to get a response"
    );
  }

  return allUserData.data;
};
