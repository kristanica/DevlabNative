import { auth, URL } from "@/assets/constants/constants";
import tryCatch from "@/assets/Hooks/function/tryCatch";
import axios from "axios";

export const gameOver = async ({
  category,
  lessonId,
  levelId,
  stageId,
}: generalTrackerPayload) => {
  const id = auth.currentUser?.uid;
  console.log("gameover payload", id, category, lessonId, levelId);
  const token = await auth.currentUser?.getIdToken(true);
  const [callResult, error] = await tryCatch(
    axios.post(
      `${URL}/fireBaseAdmin/gameOver`,
      {
        id: String(id),
        category: category,
        lessonId: lessonId,
        levelId: levelId,
        stageId: stageId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );
  if (error) {
    console.log(error);
    return;
  }

  if (callResult.status !== 200) {
    console.log(callResult.data);
    return;
  }

  console.log(
    `User lost all their lives and move to stage 1 again of ${category} ${levelId}`
  );
};
