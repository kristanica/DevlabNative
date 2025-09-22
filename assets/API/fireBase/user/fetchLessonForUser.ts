import { auth, URL } from "@/assets/constants/constants";
import axios from "axios";

const fetchLessonForUser = async (category: string) => {
  const token = await auth.currentUser?.getIdToken(true);

  try {
    const res = await axios.get(`${URL}/fireBase/getLesson/${category}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) {
      console.log("Request did not reach server");
      return null;
    }
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export default fetchLessonForUser;
