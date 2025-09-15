import { auth, URL } from "@/assets/constants/constants";
import { payloadProps } from "@/assets/constants/type";
import axios from "axios";
type editLevelProps = Omit<payloadProps, "stageId"> & {
  state: any;
};

const editLevel = async ({
  category,
  lessonId,
  levelId,
  state,
}: editLevelProps) => {
  if (!category || !lessonId || !levelId || !state) {
    return null;
  }

  const token = await auth.currentUser?.getIdToken(true);
  try {
    const res = await axios.post(
      `${URL}/fireBaseAdmin/editLevel`,
      {
        category: category,
        lessonId: lessonId,
        levelId: levelId,
        state: state,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status !== 200) {
      console.log("Something went wrong went updating the level");
      return;
    }

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default editLevel;
