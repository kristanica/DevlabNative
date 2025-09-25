import { auth, URL } from "@/assets/constants/constants";
import { payloadProps } from "@/assets/constants/type";
import axios from "axios";

const unlockNextStage = async ({
  category,
  lessonId,
  levelId,
  stageId,
}: payloadProps) => {
  const token = await auth.currentUser?.getIdToken(true);
  try {
    const res = await axios.post(
      `${URL}/fireBase/unlockStage`,
      {
        subject: category,
        lessonId: lessonId,
        levelId: levelId,
        stageId: stageId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 400) {
      console.log(res.data.message);
      return res.data; // still return res.data so caller can handle it
    }
    return res.data;
  } catch (error: any) {
    console.error(
      "unlockNextStage request failed:",
      error?.response?.data || error.message
    );
    return {
      error: true,
      message: error?.response?.data?.message || "Request failed",
    };
  }
};
export default unlockNextStage;
