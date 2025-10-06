import CheckEmptyFields from "@/assets/Hooks/function/CheckEmptyFields";
import GameComponent from "@/assets/Hooks/function/GameComponent";

import useStageEditor from "@/assets/Hooks/query/mutation/useStageEditor";
import useEditStage from "@/assets/Hooks/reducers/useEditStage";
import useModal from "@/assets/Hooks/useModal";
import { cancelVideoCompression } from "@/assets/zustand/cancelVideoCompression";
import toastHandler from "@/assets/zustand/toastHandler";
import tracker from "@/assets/zustand/tracker";
import { useIsMutating } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated from "react-native-reanimated";
import FillScreenLoading from "../global/FillScreenLoading";
import DeleteFireBaseConfirmationModal from "./DeleteFireBaseConfirmationModal";
import DropDownMenu from "./DropDownMenu";
import SaveToFirebaseConfirmation from "./SaveToFirebaseConfirmation";

const EditStageModal = ({
  visibility,
  scaleStyle,
  closeModal,
}: ScaleModalPayload) => {
  const setCancelCompression = cancelVideoCompression(
    (state) => state.setCancelCompression
  );

  const stageIdentifier = tracker((state) => state.stageId);
  const {
    editMutation,
    stageData,
    deleteMutation,
    uploadVideoMutation,
    uploadFileReplication,
  } = useStageEditor();

  const { state, dispatch } = useEditStage();
  const setToastVisibility = toastHandler((state) => state.setToastVisibility);
  useEffect(() => {
    dispatch({
      type: "UPDATE_ALL_FIELDS",
      payload: {
        title: stageData?.title || "",
        description: stageData?.description || "",
        isHidden: stageData?.isHidden || "",
        type: stageData?.type || "",
        instruction: stageData?.instruction || "",
        codingInterface: stageData?.codingInterface || "",

        timer: stageData?.timer || "",
        choices: stageData?.choices || [],
        blocks: stageData?.blocks || [],
        copyCode: stageData?.copyCode || "",
      },
    });

    console.log(state);
  }, [stageData]);

  const [videoPresentation, setvideoPresentation] = useState<string>();
  const [replicationFile, setReplicateFile] = useState<string>();

  const {
    visibility: editConfimationVisibility,
    setVisibility: setEditConfirmationVisibility,
    scaleStyle: editConfirmationScaleStyle,
    closeModal: editConfirmationCloseModal,
  } = useModal();

  const {
    visibility: deleteConfirmationVisibility,
    setVisibility: setDeleteConfirmationVisibility,
    scaleStyle: deleteConfirmationScaleStyle,
    closeModal: deleteConfirmationCloseModal,
  } = useModal();

  // Use to make useReducer, state.type, sync.
  useEffect(() => {
    if (state.type === "") {
      dispatch({
        type: "UPDATE_FIELD",
        field: "isHidden",
        value: stageData?.type !== "Lesson",
      });
    }
  }, [state.type]);

  const handleSaveToFirebase = async () => {
    const type = state.type ? state.type : stageData?.type;
    const Promises: Promise<any>[] = [];
    if (!type) {
      console.log("error");
      return;
    }
    const hasEmpty = CheckEmptyFields(state, type);
    editConfirmationCloseModal();
    if (hasEmpty) {
      closeModal();
      setToastVisibility("error", "Some fields are empty");
      //TODO: add toast if empty fields
      return;
    }

    if (videoPresentation) {
      Promises.push(
        uploadVideoMutation!.mutateAsync({ video: videoPresentation })
      );
    }
    if (replicationFile) {
      Promises.push(
        uploadFileReplication!.mutateAsync({
          file: replicationFile,
        })
      );
    }

    await Promise.all(Promises);

    editMutation?.mutate({
      state,
      stageType: stageData?.type,
    });

    dispatch({ type: "RESET_ALL_FIELD" });
    setvideoPresentation("");
    setReplicateFile("");
  };

  const isMutating = useIsMutating();
  return (
    <Modal visible={visibility} transparent={true}>
      {isMutating > 0 && <FillScreenLoading></FillScreenLoading>}
      <Pressable
        className="flex-[1] justify-center items-center bg-black/30 "
        onPress={() => {
          setCancelCompression(false);
          closeModal();
        }}
      >
        <Pressable
          className="w-[80%] h-[90%] "
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
              className="     h-full  rounded-xl "
              style={[scaleStyle]}
            >
              <View className=" bg-modal pb-5 rounded-2xl border-white border-[2px] mb-5 px-2">
                <View>
                  <Text className="text-white font-exoBold text-lg mx-auto my-3">
                    Currently editing {stageIdentifier}
                  </Text>
                  <Text className="text-white font-exoLight text-sm text-center mb-3">
                    Stage visibility cannot be changed. Lessons are
                    automatically set to Visible, and gamemodes to Hidden.
                  </Text>
                </View>
                <View className="bg-background border-[#56EBFF] border-[2px]  rounded-2xl p-2 ">
                  <Text className="text-white font-exoRegular my-2">
                    Stage Visibility
                  </Text>
                  <Text className="text-white border-[#a8b3b575] border-[2px] rounded-xl p-2 ">
                    {stageData?.isHidden ? "Hidden" : "Visibile"}
                  </Text>
                </View>
              </View>

              <View className=" flex-[3] bg-modal rounded-2xl border-white border-[2px] px-2">
                <View>
                  <DropDownMenu
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
                    placeHolder={stageData?.type}
                    value={state.type}
                  />

                  {/* Identify whether lesson, bugbust, coderush, brainbytes or codecrafter form fields */}
                  <GameComponent
                    type={state.type ? state.type : stageData?.type}
                    setVideoPresentation={setvideoPresentation}
                    dispatch={dispatch}
                    state={state}
                    stageData={stageData}
                    setReplicateFile={setReplicateFile}
                  ></GameComponent>

                  <View className="flex-row my-3">
                    <TouchableOpacity
                      className="px-7 py-2 bg-red-400 self-start mx-auto mt-2 rounded-lg"
                      onPress={() => {
                        if (stageData?.order === 1) {
                          console.log("youcannot delete this!");
                          return;
                        }
                        setDeleteConfirmationVisibility(true);
                      }}
                    >
                      <Text className="text-white font-exoBold">Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="px-7 py-2 bg-green-400 self-start mx-auto mt-2 rounded-lg "
                      onPress={() => {
                        setEditConfirmationVisibility(true);
                      }}
                    >
                      <Text className="text-white">Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {editConfimationVisibility && (
                <SaveToFirebaseConfirmation
                  onConfirm={handleSaveToFirebase}
                  visibility={editConfimationVisibility}
                  scaleStyle={editConfirmationScaleStyle}
                  closeModal={editConfirmationCloseModal}
                ></SaveToFirebaseConfirmation>
              )}
              {deleteConfirmationVisibility && (
                <DeleteFireBaseConfirmationModal
                  onConfirm={() => {
                    deleteConfirmationCloseModal();
                    closeModal();
                    deleteMutation?.mutate();
                  }}
                  visibility={deleteConfirmationVisibility}
                  scaleStyle={deleteConfirmationScaleStyle}
                  closeModal={deleteConfirmationCloseModal}
                ></DeleteFireBaseConfirmationModal>
              )}
            </Animated.View>
          </KeyboardAwareScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default EditStageModal;
