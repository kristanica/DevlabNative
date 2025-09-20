import { auth } from "@/assets/constants/constants";
import { payloadProps } from "@/assets/constants/type";
import axios from "axios";

type uploadImageProps = payloadProps & {
  file: any;
};
const uploadFile = async ({
  file,
  category,
  lessonId,
  levelId,
  stageId,
}: uploadImageProps) => {
  const token = await auth.currentUser?.getIdToken(true);
  const fileForm = new FormData();

  try {
    fileForm.append("replicateFile", {
      uri: file,
      type: "text/html",
      name: "file.html",
    } as any);

    fileForm.append("category", category);
    fileForm.append("lessonId", lessonId);
    fileForm.append("levelId", levelId);
    fileForm.append("stageId", stageId);
    await axios.post(
      `https://4b93dc49e335.ngrok-free.app/fireBaseAdmin/uploadFile`,
      fileForm,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return;
  } catch (error) {
    console.log(error);
  }
};

export default uploadFile;
