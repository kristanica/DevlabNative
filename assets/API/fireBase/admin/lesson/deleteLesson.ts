import { auth, URL } from "@/assets/constants/constants";
import axios from "axios";

const deleteLesson = async (category: string, lessonIdDeletion: string) => {
  const currentUser = auth.currentUser;
  const token = await currentUser?.getIdToken(true);
  try {
    const res = await axios.post(
      `${URL}/fireBaseAdmin/deleteLesson`,
      {
        category,
        lessonId: lessonIdDeletion,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default deleteLesson;
