import { auth, URL } from "@/assets/constants/constants";
import tracker from "@/assets/zustand/tracker";
import axios from "axios";

const editStage = async (state: any, stageType: string) => {
  const levelPayload = tracker.getState().levelPayload;
  const stageIdentifier = tracker.getState().stageId;

  if (!levelPayload || !stageIdentifier) {
    throw new Error("Something went wrong with the payload");
  }

  try {
    const token = await auth.currentUser?.getIdToken(true);
    const res = await axios.post(
      `${URL}/fireBaseAdmin/editStage`,
      {
        category: levelPayload?.category,
        lessonId: levelPayload?.lessonId,
        levelId: levelPayload?.levelId,
        stageId: stageIdentifier,
        state: state,
        stageType: stageType,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-source": "mobile-app",
        },
      }
    );
    if (res.status === 200) {
      console.log(res.data.message);
      return res.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default editStage;
