import { auth, URL } from "@/assets/constants/constants";
import { payloadProps } from "@/assets/constants/type";
import axios from "axios";

const deleteLevel = async ({
  category,
  lessonId,
  levelId,
}: Omit<payloadProps, "stageId">) => {
  const token = await auth.currentUser?.getIdToken(true);

  try {
    const res = await axios.post(
      `${URL}/fireBaseAdmin/deleteLevel`,
      {
        category: category,
        lessonId: lessonId,
        levelId: levelId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status !== 200) {
      console.log("Something went wrong when deleting specfic level data");
      return;
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default deleteLevel;
