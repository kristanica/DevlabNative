import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteStage from "../../../API/fireBase/admin/stage/deleteStage";
import editStage from "../../../API/fireBase/admin/stage/editStage";
import getStageData from "../../../API/fireBase/admin/stage/getStageData";
import uploadImage from "../../../API/fireBase/admin/stage/uploadImage";
import uploadVideo from "../../../API/fireBase/admin/stage/uploadVideo";
import tracker from "../../../zustand/tracker";
import customQuery from "../../function/customQuery";

type uploadImageProps = {
  image: any;
};

type uploadVideoProps = {
  video: any;
};

const useStageEditor = () => {
  const queryClient = useQueryClient();
  const levelPayload = tracker((state) => state.levelPayload);
  const stageId = tracker((state) => state.stageId);

  if (!levelPayload || !stageId) {
    return { stageData: undefined, mutation: undefined };
  }
  const { data: stageData, isLoading } = customQuery(
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
    }) => await editStage(state, stageType),
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
    mutationFn: async ({ video }: uploadVideoProps) =>
      await uploadVideo({
        video,
        category: levelPayload.category,
        lessonId: levelPayload.lessonId,
        levelId: levelPayload.levelId,
        stageId,
      }),
  });

  const uploadImageReplication = useMutation({
    mutationFn: async ({ image }: uploadImageProps) =>
      await uploadImage({
        image,
        category: levelPayload.category,
        lessonId: levelPayload.lessonId,
        levelId: levelPayload.levelId,
        stageId,
      }),
  });

  return {
    stageData,
    editMutation,
    deleteMutation,
    uploadVideoMutation,
    uploadImageReplication,
    isLoading,
  };
};

export default useStageEditor;
