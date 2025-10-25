import { auth, URL } from "@/constants";
import axios from "axios";

const fetchLessonsForAdmin = async (category: string) => {
  try {
    const currentUser = auth.currentUser;
    const token = await currentUser?.getIdToken(true);
    const res = await axios.get(
      `${URL}/fireBaseAdmin/getAllLevel/${category}`,
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

export default fetchLessonsForAdmin;
