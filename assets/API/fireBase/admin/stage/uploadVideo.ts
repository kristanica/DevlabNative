import { auth, URL } from "@/assets/constants/constants";
import { payloadProps } from "@/assets/constants/type";
import axios from "axios";
type uploadVideoProps = payloadProps & {
  video: any;
};
const uploadVideo = async ({
  video,
  category,
  lessonId,
  levelId,
  stageId,
}: uploadVideoProps) => {
  const videoForm = new FormData();
  const token = await auth.currentUser?.getIdToken(true);

  videoForm.append("video", {
    uri: video,
    type: "video/mp4",
    name: "test.mp4",
  } as any);
  videoForm.append("category", category);
  videoForm.append("lessonId", lessonId);
  videoForm.append("levelId", levelId);
  videoForm.append("stageId", stageId);
  await axios.post(`${URL}/fireBaseAdmin/uploadVideo`, videoForm, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return;
};

export default uploadVideo;
