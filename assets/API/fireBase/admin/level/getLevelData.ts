import { auth } from "@/assets/constants/constants";
import { payloadProps } from "@/assets/constants/type";
import axios from "axios";
type levelDataType = {
  title: string;
  description: string;
  coinsReward: number;
  expReward: number;
};

const getLevelData = async ({
  category,
  lessonId,
  levelId,
}: Omit<payloadProps, "stageId">) => {
  const token = await auth.currentUser?.getIdToken(true);
  if (!category || !lessonId || levelId) {
    return null;
  }

  try {
    const res = await axios.get(
      `https://b49bb8ad43a2.ngrok-free.app/fireBaseAdmin/specificLevelData/${category}/${lessonId}/${levelId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status !== 200) {
      console.log("Something went wrong when retriveing specfic level data");
      return;
    }
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getLevelData;
