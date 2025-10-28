import { payloadProps } from "@/assets/constants/type";
import { auth, URL } from "@/constants";
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
      uri: file.uri || file, // ensure it's a valid local URI
      type: "text/html",
      name: "file.html",
    } as any);

    fileForm.append("category", category);
    fileForm.append("lessonId", lessonId);
    fileForm.append("levelId", levelId);
    fileForm.append("stageId", stageId);
    await axios.post(`${URL}/fireBaseAdmin/uploadFile`, fileForm, {
      headers: {
        "Content-Type": "multipart/form-data",

        Authorization: `Bearer ${token}`,
      },
    });

    return;
  } catch (error) {
    console.log(error + "uploADIFLEEEEEEEEEE");
  }
};

export default uploadFile;
