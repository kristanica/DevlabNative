import { auth, URL } from "@/assets/constants/constants";
import axios from "axios";

const addLesson = async (category: string) => {
  const currentUser = auth.currentUser;
  const token = await currentUser?.getIdToken(true);

  try {
    const res = await axios.post(
      `${URL}/fireBaseAdmin/addLesson`,
      {
        category,
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

export default addLesson;
