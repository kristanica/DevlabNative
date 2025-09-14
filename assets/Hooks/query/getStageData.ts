import { auth, URL } from "@/assets/constants/constants";
import tracker from "@/assets/zustand/tracker";
import axios from "axios";

const getStageData = async () => {
  const levelPayload = tracker.getState().levelPayload;
  const stageIdentifier = tracker.getState().stageId;
  const token = await auth.currentUser?.getIdToken(true);
  if (!levelPayload || !stageIdentifier) {
    throw new Error("Something went wrong with the payload");
  }
  try {
    const res = await axios.get(
      `${URL}/fireBaseAdmin/getStage/${levelPayload.category}/${levelPayload?.lessonId}/${levelPayload.levelId}/${stageIdentifier}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      return res.data;
    }
  } catch {
    return {};
  }
};

export default getStageData;
