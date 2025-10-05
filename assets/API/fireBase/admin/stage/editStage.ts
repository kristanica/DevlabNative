import { auth, URL } from "@/assets/constants/constants";
import tracker from "@/assets/zustand/tracker";
import axios from "axios";

const editStage = async (state: any, stageType: string) => {
  const levelPayload = tracker.getState().levelPayload;
  const stageIdentifier = tracker.getState().stageId;

  if (!levelPayload || !stageIdentifier) {
    throw new Error("Something went wrong with the payload");
  }

  console.log("Original state:", JSON.stringify(state, null, 2));

  // Normalize existing images: convert {url, fieldName} objects to just the URL string
  const normalizedBlocks = state.blocks?.map((block: any) => {
    if (
      block.type === "Image" &&
      block.value &&
      typeof block.value === "object"
    ) {
      // If value is an object with url property, extract just the URL
      return { ...block, value: block.value.url };
    }
    return block;
  });

  const normalizedState = {
    ...state,
    blocks: normalizedBlocks || state.blocks,
  };

  // Check if there are images with local file URIs to upload
  const hasLocalImages = normalizedState.blocks?.some(
    (block: any) =>
      block.type === "Image" &&
      typeof block.value === "string" &&
      block.value.startsWith("file://")
  );

  console.log("Has local images:", hasLocalImages);

  try {
    const token = await auth.currentUser?.getIdToken(true);

    // If no local images, send as JSON
    if (!hasLocalImages) {
      console.log("No local images, sending as JSON");

      const res = await axios.post(
        `${URL}/fireBaseAdmin/editStage`,
        {
          category: levelPayload?.category,
          lessonId: levelPayload?.lessonId,
          levelId: levelPayload?.levelId,
          stageId: stageIdentifier,
          state: normalizedState,
          stageType: stageType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-source": "mobile-app",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        console.log("Success:", res.data.message);
        return res.data;
      }
      return;
    }

    // If there are local images, use FormData
    console.log("Local images detected, sending as FormData");
    const formData = new FormData();
    formData.append("category", levelPayload?.category);
    formData.append("lessonId", levelPayload.lessonId);
    formData.append("levelId", levelPayload.levelId);
    formData.append("stageId", stageIdentifier);
    formData.append("stageType", stageType);

    const processedBlocks = normalizedState.blocks.map((block: any) => {
      if (
        block.type === "Image" &&
        typeof block.value === "string" &&
        block.value.startsWith("file://")
      ) {
        const fileType = block.value.split(".").pop();

        console.log(`Appending image_${block.id}:`, block.value);

        formData.append(`image_${block.id}`, {
          uri: block.value,
          name: `image_${block.id}.${fileType}`,
          type: `image/${fileType}`,
        } as any);

        // Replace with reference key
        return { ...block, value: `image_${block.id}` };
      }
      return block;
    });

    const modifiedState = {
      ...normalizedState,
      blocks: processedBlocks,
    };

    console.log("Modified state:", JSON.stringify(modifiedState, null, 2));

    formData.append("state", JSON.stringify(modifiedState));

    const res = await axios.post(`${URL}/fireBaseAdmin/editStage`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-source": "mobile-app",
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status === 200) {
      console.log("Success:", res.data.message);
      return res.data;
    }
  } catch (error) {
    console.error("Edit stage error:", error);
    if (axios.isAxiosError(error)) {
      console.error("Response data:", error.response?.data);
      console.error("Response status:", error.response?.status);
    }
    return null;
  }
};

export default editStage;
