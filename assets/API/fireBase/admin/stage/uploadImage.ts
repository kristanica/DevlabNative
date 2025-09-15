import { auth, URL } from "@/assets/constants/constants";
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
  console.log(image);
  try {
    imageForm.append("replicateImage", {
      uri: image,
      type: "image/jpeg",
      name: "image.jpg",
    } as any);
    imageForm.append("category", category);
    imageForm.append("lessonId", lessonId);
    imageForm.append("levelId", levelId);
    imageForm.append("stageId", stageId);

    const res = await axios.post(
      `${URL}/fireBaseAdmin/uploadImage`,
      imageForm,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      console.log(res.data.message);
    }
    return;
  } catch (error) {
    console.log(error);
  }
};
export default uploadImage;
