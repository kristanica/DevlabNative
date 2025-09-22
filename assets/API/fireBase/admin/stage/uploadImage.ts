import { auth } from "@/assets/constants/constants";
import { payloadProps } from "@/assets/constants/type";
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
    console.log("image on upload call " + image);
    imageForm.append("replicateFile", {
      uri: image,
      type: "image/jpeg",
      name: "image.jpg",
    } as any);

    imageForm.append("category", category);
    imageForm.append("lessonId", lessonId);
    imageForm.append("levelId", levelId);
    imageForm.append("stageId", stageId);
    await axios.post(
      `https://95b59cbdc332.ngrok-free.app/fireBaseAdmin/test`,
      imageForm,
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
export default uploadImage;
