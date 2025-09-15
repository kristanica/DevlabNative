import { auth, URL } from "@/assets/constants/constants";
import axios from "axios";

const addLevel = async (category: string, lessonId: string) => {
  const currentUser = auth.currentUser;
  const token = await currentUser?.getIdToken(true);

  try {
    const res = await axios.post(
      `${URL}/fireBaseAdmin/addLevel`,
      {
        category,
        lessonId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default addLevel;
