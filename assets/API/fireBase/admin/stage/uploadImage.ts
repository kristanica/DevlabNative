import { payloadProps } from "@/assets/constants/type";
import { auth, URL } from "@/constants";
import axios from "axios";
type uploadImageProps = payloadProps & {
  image: any;
};

const uploadImage = async ({
  image,
  category,
  lessonId,
  levelId,
  stageId,
}: uploadImageProps) => {
  const token = await auth.currentUser?.getIdToken(true);
  const imageForm = new FormData();

  try {
    imageForm.append("replicateFile", {
      uri: image,
      type: "image/jpeg",
      name: "image.jpg",
    } as any);

    imageForm.append("category", category);
    imageForm.append("lessonId", lessonId);
    imageForm.append("levelId", levelId);
    imageForm.append("stageId", stageId);
    await axios.post(`${URL}/fireBaseAdmin/test`, imageForm, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return;
  } catch (error) {
    console.log(error);
  }
};
export default uploadImage;
