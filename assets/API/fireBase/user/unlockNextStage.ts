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
        currentStageId: stageId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status !== 200) {
      console.log("Whoops, something went wrong when unlocking the next stage");
      return null;
    }

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export default unlockNextStage;
