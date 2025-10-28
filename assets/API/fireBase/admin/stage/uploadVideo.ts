import { payloadProps } from "@/assets/constants/type";
import { auth, URL } from "@/constants";

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
  const token = await auth.currentUser?.getIdToken(true);
  const videoForm = new FormData();
  console.log(category, lessonId, levelId, stageId);
  try {
    videoForm.append("video", {
      uri: video,
      type: "video/mp4",
      name: `video.mp4`,
    } as any);

    videoForm.append("category", String(category));
    videoForm.append("lessonId", String(lessonId));
    videoForm.append("levelId", String(levelId));
    videoForm.append("stageId", String(stageId));

    console.log("📤 Uploading video...");

    // ✅ Use fetch instead of axios
    const response = await fetch(`${URL}/fireBaseAdmin/uploadVideo`, {
      method: "POST",
      body: videoForm,
      headers: {
        Authorization: `Bearer ${token}`,
        // ❌ DO NOT set Content-Type - let fetch handle it
      },
    });

    console.log("📥 Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Upload failed:", errorText);
      throw new Error(`Upload failed: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("✅ Upload successful:", result);
    return result;
  } catch (error) {
    console.error("❌ Upload error:", error);
    throw error;
  }
};

export default uploadVideo;
