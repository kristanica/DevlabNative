import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { auth, URL } from "../constants/constants";
import tracker from "../zustand/tracker";
import customQuery from "./function/customQuery";
import getStageData from "./query/getStageData";
import deleteStage from "./query/mutation/deleteStage";
import editStage from "./query/mutation/editStage";

const useStageEditor = () => {
  const queryClient = useQueryClient();
  const levelPayload = tracker((state) => state.levelPayload);
  const stageId = tracker((state) => state.stageId);

  if (!levelPayload || !stageId) {
    return { stageData: undefined, mutation: undefined };
  }
  const { data: stageData } = customQuery(
    [
      "stage",
      levelPayload.category,
      levelPayload.lessonId,
      levelPayload.levelId,
      stageId,
    ],
    getStageData
  );

  const editMutation = useMutation({
    mutationFn: async ({
      state,
      stageType,
    }: {
      state: any;
      stageType: string;
    }) => editStage(state, stageType),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "stage",
          levelPayload?.category,
          levelPayload?.lessonId,
          levelPayload?.levelId,
          stageId,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "Stages",
          levelPayload?.category,
          levelPayload?.lessonId,
          levelPayload?.levelId,
        ],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => deleteStage(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "Stages",
          levelPayload?.category,
          levelPayload?.lessonId,
          levelPayload?.levelId,
        ],
      });
    },
  });
  const uploadVideoMutation = useMutation({
    mutationFn: async ({ video }: { video: any }) => {
      const videoForm = new FormData();
      const token = await auth.currentUser?.getIdToken(true);

      videoForm.append("video", {
        uri: video,
        type: "video/mp4",
        name: "test.mp4",
      } as any);
      videoForm.append("category", levelPayload.category);
      videoForm.append("lessonId", levelPayload.lessonId);
      videoForm.append("levelId", levelPayload.levelId);
      videoForm.append("stageId", stageId);
      await axios.post(`${URL}/fireBaseAdmin/uploadVideo`, videoForm, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return;
    },
  });

  const uploadImageReplication = useMutation({
    mutationFn: async ({ image }: { image: any }) => {
      const token = await auth.currentUser?.getIdToken(true);
      const imageForm = new FormData();
      console.log(image);
      try {
        imageForm.append("replicateImage", {
          uri: image,
          type: "image/jpeg",
          name: "image.jpg",
        } as any);
        imageForm.append("category", levelPayload.category);
        imageForm.append("lessonId", levelPayload.lessonId);
        imageForm.append("levelId", levelPayload.levelId);
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
    },
  });

  return {
    stageData,
    editMutation,
    deleteMutation,
    uploadVideoMutation,
    uploadImageReplication,
  };
};

export default useStageEditor;
