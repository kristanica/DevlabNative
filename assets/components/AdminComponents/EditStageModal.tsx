import CheckEmptyFields from "@/assets/Hooks/function/CheckEmptyFields";
import GameComponent from "@/assets/Hooks/function/GameComponent";

import useStageEditor from "@/assets/Hooks/query/mutation/useStageEditor";
import useEditStage from "@/assets/Hooks/reducers/useEditStage";
import useModal from "@/assets/Hooks/useModal";
import { cancelVideoCompression } from "@/assets/zustand/cancelVideoCompression";
import toastHandler from "@/assets/zustand/toastHandler";
import tracker from "@/assets/zustand/tracker";
import Ionicons from "@expo/vector-icons/Ionicons";
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
    isLoading,
  } = useStageEditor();

  const { state, dispatch } = useEditStage();
  const setToastVisibility = toastHandler((state) => state.setToastVisibility);

  const [videoPresentation, setvideoPresentation] = useState<string>();
  const [replicationFile, setReplicateFile] = useState<string>();
  useEffect(() => {
    if (!stageData) return; // exit early if stageData is undefined or null

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

    //FIXME: SHOW IF THERE IS ALREADY A FILE UPLOADAED
    console.log(stageData?.replicationFile + "ASDHJGASHJDGASHJDGHJASGDJHSA");

    console.log(state);
  }, [stageData]);

  const editConfirmationModal = useModal();

  const deleteConfirmationModal = useModal();

  // Use to make useReducer, state.type, sync.
  //FIXME: Not updating the isHidden
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
    editConfirmationModal.closeModal();
    if (hasEmpty) {
      closeModal();
      setToastVisibility("error", "Some fields are empty");

      return;
    }

    if (videoPresentation) {
      console.log("There is something inhere!!!!!!!!!!!");
      console.log(videoPresentation);
      Promises.push(
        uploadVideoMutation!.mutateAsync({ video: videoPresentation })
      );
    }
    if (replicationFile) {
      console.log("tehre is a file!: " + replicationFile);
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
                    Currently editing {stageIdentifier}
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
                    {stageData?.isHidden ? "Hidden" : "Visibile"}
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
                    isStageOne={stageIdentifier || ""}
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

                  <View className="flex-row my-3 mx-2">
                    <TouchableOpacity
                      className="px-7 py-2 bg-red-500 w-[50%]  rounded-lg "
                      onPress={() => {
                        if (stageData?.order === 1) {
                          setToastVisibility(
                            "error",
                            "You cannot delete this stage!"
                          );
                          closeModal();
                          return;
                        }
                        deleteConfirmationModal.setVisibility(true);
                      }}
                    >
                      <Text className="text-white font-exoBold text-center">
                        Delete
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="px-7 py-2 bg-green-500 w-[50%]  rounded-lg "
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
              </View>
              {editConfirmationModal.visibility && (
                <SaveToFirebaseConfirmation
                  onConfirm={handleSaveToFirebase}
                  {...editConfirmationModal}
                ></SaveToFirebaseConfirmation>
              )}
              {deleteConfirmationModal.visibility && (
                <DeleteFireBaseConfirmationModal
                  onConfirm={() => {
                    deleteConfirmationModal.closeModal();
                    closeModal();
                    deleteMutation?.mutate();
                  }}
                  {...deleteConfirmationModal}
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
