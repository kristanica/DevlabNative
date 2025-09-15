import CheckEmptyFields from "@/assets/Hooks/function/CheckEmptyFields";
import GameComponent from "@/assets/Hooks/function/GameComponent";

import useStageEditor from "@/assets/Hooks/query/mutation/useStageEditor";
import useEditStage from "@/assets/Hooks/reducers/useEditStage";
import useKeyBoardHandler from "@/assets/Hooks/useKeyBoardHandler";
import useModal from "@/assets/Hooks/useModal";
import { cancelVideoCompression } from "@/assets/zustand/cancelVideoCompression";
import tracker from "@/assets/zustand/tracker";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";
import FillScreenLoading from "../global/FillScreenLoading";
import DeleteFireBaseConfirmationModal from "./DeleteFireBaseConfirmationModal";
import DropDownMenu from "./DropDownMenu";
import SaveToFirebaseConfirmation from "./SaveToFirebaseConfirmation";
import SaveToFirebaseResultModal from "./SaveToFirebaseResultModal";

type EditStageModalProps = {
  visibility: boolean;
  scaleStyle: AnimatedStyle<ViewStyle>;
  closeModal: () => void;
};

const EditStageModal = ({
  visibility,
  scaleStyle,
  closeModal,
}: EditStageModalProps) => {
  const setCancelCompression = cancelVideoCompression(
    (state) => state.setCancelCompression
  );

  const stageIdentifier = tracker((state) => state.stageId);
  const { state, dispatch } = useEditStage();
  const {
    editMutation,
    stageData,
    deleteMutation,
    uploadVideoMutation,
    uploadImageReplication,
  } = useStageEditor();
  const [isFirebaseSuccess, setisFirebaseSuccess] = useState<boolean>(false);

  const [videoPresentation, setvideoPresentation] = useState<string>();
  const [replicateImage, setReplicateImage] = useState<string>();

  const { keyBoardHandlingStyle } = useKeyBoardHandler();

  const {
    visibility: editConfimationVisibility,
    setVisibility: setEditConfirmationVisibility,
    scaleStyle: editConfirmationScaleStyle,
    closeModal: editConfirmationCloseModal,
  } = useModal();

  const {
    visibility: fireBaseResultVisibility,
    setVisibility: setFireBaseResultVisibility,
    scaleStyle: fireBaseResultScaleStyle,
    closeModal: fireBaseResultVisibilityCloseModal,
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
  return (
    <Modal visible={visibility} transparent={true}>
      <Pressable
        className="flex-[1] justify-center items-center bg-black/30 "
        onPress={() => {
          setCancelCompression(false);
          closeModal();
        }}
      >
        <Pressable
          className="w-[80%] h-[70%]"
          onPress={(e) => {
            e.stopPropagation();
          }}
        >
          <Animated.View
            className="  bg-accent  border-[2px] h-full border-[#ffffff43] rounded-xl"
            style={[scaleStyle, keyBoardHandlingStyle]}
          >
            <View className="mx-2">
              <ScrollView
                contentContainerStyle={{
                  paddingVertical: 16,
                  paddingHorizontal: 12,
                }}
                showsVerticalScrollIndicator={false}
              >
                <Text className="text-white font-exoBold text-lg mx-auto my-3">
                  Currently editing {stageIdentifier}
                </Text>
                <Text className="text-white font-exoLight text-sm text-center mb-3">
                  Stage visibility cannot be changed. Lessons are automatically
                  set to Visible, and gamemodes to Hidden.
                </Text>
                <View className="bg-background border-[#56EBFF] border-[2px] p-3 rounded-2xl ">
                  <Text className="text-white font-exoRegular my-2">
                    Stage Visibility
                  </Text>
                  <Text className="text-white border-[#a8b3b575] border-[2px] rounded-xl p-2 my-2">
                    {stageData?.isHidden ? "Hidden" : "Visibile"}
                  </Text>
                </View>
                {uploadImageReplication?.isPending && (
                  <View className="absolute inset-0 z-50">
                    <FillScreenLoading />
                  </View>
                )}
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
                  setReplicateImage={setReplicateImage}
                ></GameComponent>

                <View className="flex-row my-3">
                  <TouchableOpacity
                    className="px-7 py-2 bg-red-400 self-start mx-auto mt-2 rounded-lg"
                    onPress={() => {
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
              </ScrollView>
            </View>
            {editConfimationVisibility && (
              <SaveToFirebaseConfirmation
                onConfirm={async () => {
                  const type = state.type ? state.type : stageData?.type;

                  if (!type) {
                    console.log("error");
                    return;
                  }
                  //Checks if any of the fields is empty
                  const hasEmpty = CheckEmptyFields(state, type);
                  editConfirmationCloseModal();
                  if (hasEmpty) {
                    console.log("There is an empty fieldasds");
                    setisFirebaseSuccess(false);
                    setFireBaseResultVisibility(true);
                    return;
                  }

                  if (videoPresentation) {
                    uploadVideoMutation?.mutate({
                      video: videoPresentation,
                    });
                    setvideoPresentation("");
                  }
                  if (replicateImage) {
                    uploadImageReplication?.mutate({
                      image: replicateImage,
                    });
                    setReplicateImage("");
                  }

                  editMutation?.mutate({
                    state,
                    stageType: stageData?.type,
                  });

                  setisFirebaseSuccess(true);
                  setFireBaseResultVisibility(true);
                  dispatch({ type: "RESET_ALL_FIELD" });
                }}
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

            {fireBaseResultVisibility && (
              <SaveToFirebaseResultModal
                isFirebaseSuccess={isFirebaseSuccess}
                visibility={fireBaseResultVisibility}
                scaleStyle={fireBaseResultScaleStyle}
                closeModal={fireBaseResultVisibilityCloseModal}
                onConfirm={() => setFireBaseResultVisibility(false)}
              ></SaveToFirebaseResultModal>
            )}
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default EditStageModal;
