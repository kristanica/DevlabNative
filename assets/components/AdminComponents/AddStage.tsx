import CheckEmptyFields from "@/assets/Hooks/function/CheckEmptyFields";
import GameComponent from "@/assets/Hooks/function/GameComponent";

import uploadFile from "@/assets/API/fireBase/admin/stage/uploadFile";
import uploadVideo from "@/assets/API/fireBase/admin/stage/uploadVideo";
import useStageEditor from "@/assets/Hooks/query/mutation/useStageEditor";
import useEditStage from "@/assets/Hooks/reducers/useEditStage";
import useModal from "@/assets/Hooks/useModal";
import { cancelVideoCompression } from "@/assets/zustand/cancelVideoCompression";
import toastHandler from "@/assets/zustand/toastHandler";
import tracker from "@/assets/zustand/tracker";
import { URL } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useIsMutating,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated from "react-native-reanimated";
import FillScreenLoading from "../global/FillScreenLoading";
import DropDownMenu from "./DropDownMenu";
import SaveToFirebaseConfirmation from "./SaveToFirebaseConfirmation";
export const AddStage = ({
  visibility,
  scaleStyle,
  closeModal,
}: ScaleModalPayload) => {
  const setCancelCompression = cancelVideoCompression(
    (state) => state.setCancelCompression
  );

  const { uploadVideoMutation, uploadFileReplication, isLoading } =
    useStageEditor();

  const { state, dispatch } = useEditStage();
  const setToastVisibility = toastHandler((state) => state.setToastVisibility);

  const [videoPresentation, setvideoPresentation] = useState<string>();
  const [replicationFile, setReplicateFile] = useState<string>();
  useEffect(() => {
    dispatch({
      type: "UPDATE_ALL_FIELDS",
      payload: {
        title: "",
        description: "",
        isHidden: "",
        type: false,
        instruction: "",
        codingInterface: {
          css: "",
          js: "",
          html: "",
          database: "",
        },

        timer: "",
        choices: {
          a: "",
          b: "",
          c: "",
          d: "",
          correctAnswer: "",
        },
        blocks: [],
      },
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "UPDATE_FIELD",
      field: "isHidden",
      value: state?.type !== "Lesson",
    });
  }, [state.type]);

  const handleSaveToFirebase = async () => {
    const type = state.type;
    if (!type) {
      console.log("error");
      return;
    }
    const hasEmpty = CheckEmptyFields(state, type);
    editConfirmationModal.closeModal();
    if (hasEmpty) {
      setToastVisibility("error", "Some fields are empty");
      return;
    }

    allinone?.mutate({
      stateStage: state,
      stageType: state?.type,
      video: videoPresentation, // pass video here
      replicationFile: replicationFile, // pass replication file here
    });

    dispatch({ type: "RESET_ALL_FIELD" });
    setvideoPresentation("");
    setReplicateFile("");
  };
  const isMutating = useIsMutating();

  const aboutGamemode: any = {
    BugBust: "Users will be tasked to fix the given code with a bug.",
    BrainBytes:
      "Users will be tasked to choose the correct answer from the given choices.",
    CodeRush:
      "Users will be tasked to finish the activity before the timer runs out.",
    CodeCrafter:
      "A code-building activity where users must create what is tasked. A reference file can be uploaded for replication. Disabled on Database",
    Lesson:
      "A learning activity in which users study a given topic or concept before proceeding to challenges.",
  };

  const initialStageState = {
    title: "",
    description: "",
    isHidden: false,
    type: "",
    instruction: "",
    codingInterface: {
      css: "",
      js: "",
      html: "",
      database: "",
    },

    timer: 0,
    choices: {
      a: "",
      b: "",
      c: "",
      d: "",
      correctAnswer: "",
    },
    blocks: [],
  };

  const editConfirmationModal = useModal();
  const levelPayload = tracker((state) => state.levelPayload);

  const querClient = useQueryClient();

  const allinone = useMutation({
    mutationFn: async ({ stateStage, video, replicationFile }: any) => {
      if (!levelPayload) return null;

      const { category, lessonId, levelId } = levelPayload;

      const formData = new FormData();

      formData.append("category", category);
      formData.append("lessonId", lessonId);
      formData.append("levelId", levelId);

      const processedBlocks = stateStage.blocks?.map((block: any) => {
        if (block.type === "Image" && block.value?.startsWith("file://")) {
          const fileType = block.value.split(".").pop();
          formData.append(`image_${block.id}`, {
            uri: block.value,
            name: `image_${block.id}.${fileType}`,
            type: `image/${fileType}`,
          } as any);

          return block;
        }
        return block;
      });

      const modifiedStageState = { ...stateStage, blocks: processedBlocks };
      formData.append("stageState", JSON.stringify(modifiedStageState));

      // Send request
      const response = await axios.post(
        `${URL}/fireBaseAdmin/addNewStage`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status !== 200 || !response.data.newStageId) {
        throw new Error("addNewLevel failed or missing nextLevelId");
      }

      if (video) {
        await uploadVideo({
          video: video,
          category,
          lessonId: lessonId,
          levelId: levelId,
          stageId: response.data.newStageId,
        });
        console.log("🎥 Video uploaded successfully");
      }

      if (replicationFile) {
        await uploadFile({
          file: replicationFile,
          category: levelPayload.category,
          lessonId: levelPayload.lessonId,
          levelId: levelPayload.levelId,
          stageId: response.data.newStageId,
        });
      }

      return response.data;
    },
    onSuccess: () => {
      console.log("incalidating queriess");
      querClient.invalidateQueries({
        queryKey: [
          "Stages",
          levelPayload?.category,
          levelPayload?.lessonId,
          levelPayload?.levelId,
        ],
      });
    },
    onSettled: () => {
      closeModal();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <Modal visible={visibility} transparent={true}>
      {(isMutating > 0 || isLoading) && <FillScreenLoading></FillScreenLoading>}
      <Pressable
        className="flex-[1] justify-center items-center bg-black/50"
        onPress={() => {
          setCancelCompression(false);
        }}
      >
        <Pressable
          className="w-[90%]  "
          onPress={(e) => {
            e.stopPropagation();
          }}
        >
          <KeyboardAwareScrollView
            contentContainerStyle={{}}
            enableOnAndroid
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Animated.View
              className="  h-full  rounded-xl  "
              style={[scaleStyle]}
            >
              <View className=" bg-modal pb-5 rounded-2xl border-[#2a3141] border-[1px] mb-5 px-2">
                <Pressable onPress={() => closeModal()}>
                  <Ionicons
                    name={"close"}
                    size={25}
                    color={"white"}
                    className="py-2"
                  ></Ionicons>
                </Pressable>

                <View>
                  <Text className="text-white font-exoBold text-lg mx-auto my-3">
                    Adding a new Stage
                  </Text>
                  <Text className="text-white font-exoLight text-sm text-center mb-3">
                    Stage visibility cannot be changed. Lessons are
                    automatically set to Visible, and gamemodes to Hidden.
                  </Text>
                </View>
                <View className="bg-background border-[#90b6bb] border-[1px]  rounded-2xl p-2 ">
                  <Text className="text-white font-exoRegular my-2">
                    Stage Visibility
                  </Text>
                  <Text className="text-white border-[#a8b3b575] border-[2px] rounded-xl p-2 ">
                    {state?.isHidden ? "Hidden" : "Visibile"}
                  </Text>
                </View>
              </View>

              <View className=" flex-[3] bg-modal rounded-2xl border-[#2a3141] border-[1px] px-2">
                <Text className="text-white font-exoLight text-sm   text-center py-2">
                  {(state.type && aboutGamemode[state.type]) ||
                    "Select a gamemode to see its description."}
                </Text>
                <View>
                  <DropDownMenu
                    isStageOne={"Stage2"}
                    onSelect={(item) => {
                      // set type to gamemodes
                      dispatch({
                        type: "UPDATE_FIELD",
                        field: "type",
                        value: item,
                      });

                      //sets gamemodes to hidden and lessons to visible
                      dispatch({
                        type: "UPDATE_FIELD",
                        field: "isHidden",
                        value: item !== "Lesson",
                      });
                    }}
                    placeHolder={state?.type}
                    value={state.type}
                  />

                  {/* Identify whether lesson, bugbust, coderush, brainbytes or codecrafter form fields */}
                  <GameComponent
                    type={state.type}
                    setVideoPresentation={setvideoPresentation}
                    dispatch={dispatch}
                    state={state}
                    stageData={initialStageState}
                    setReplicateFile={setReplicateFile}
                    videoPresentation={videoPresentation}
                  ></GameComponent>

                  <TouchableOpacity
                    className="px-7 py-2 bg-green-500   rounded-lg  mx-auto w-full my-2"
                    // className="px-7 py-2 bg-green-500 self-start mx-auto mt-2 rounded-lg "
                    onPress={() => {
                      editConfirmationModal.setVisibility(true);
                    }}
                  >
                    <Text className="text-white font-exoBold text-center">
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {editConfirmationModal.visibility && (
                <SaveToFirebaseConfirmation
                  onConfirm={handleSaveToFirebase}
                  {...editConfirmationModal}
                ></SaveToFirebaseConfirmation>
              )}
            </Animated.View>
          </KeyboardAwareScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
