import { auth, URL } from "@/assets/constants/constants";
import axios from "axios";

export const fetchAchievements = async (category: string) => {
  const token = await auth.currentUser?.getIdToken(true);
  console.log(URL);
  try {
    const res = await axios.get(
      `https://9b41046acf73.ngrok-free.app/fireBase/achievements/${category}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status !== 200) {
      console.log(res.status);
      return;
    }

    const sortedAchievements = Object.entries(res.data)
      .map(([id, data]: any) => ({ id, ...data }))
      .sort((a, b) => a.order - b.order);

    return sortedAchievements;
  } catch (error) {
    console.log(error);
    return;
  }
};
