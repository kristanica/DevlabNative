import { auth, URL } from "@/assets/constants/constants";
import tracker from "@/assets/zustand/tracker";
import axios from "axios";

type StageDataProps = {
  id: string;
  title: string;
  description: string;
  type: "lesson" | "game";
  isHidden?: boolean;
};

const ListStages = async () => {
  const levelPayload = tracker.getState().levelPayload;
  const token = await auth.currentUser?.getIdToken(true);
  if (!levelPayload) {
    return [];
  }
  try {
    const res = await axios.get(
      `${URL}/fireBaseAdmin/listStage/${levelPayload.category}/${levelPayload.lessonId}/${levelPayload.levelId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default ListStages;
