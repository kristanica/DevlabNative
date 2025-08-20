import GameComponent from "@/assets/Hooks/function/GameComponent";
import useEditStage from "@/assets/Hooks/useEditStage";
import useKeyBoardHandler from "@/assets/Hooks/useKeyBoardHandler";
import useModal from "@/assets/Hooks/useModal";
import useStageEditor from "@/assets/Hooks/useStageEditor";
import tracker from "@/assets/zustand/tracker";
import React, { useEffect } from "react";
import {
  Keyboard,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";
import DropDownMenu from "./DropDownMenu";
import SaveToFirebaseConfirmation from "./SaveToFirebaseConfirmation";
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
  const stageIdentifier = tracker((state) => state.stageId);
  const { state, dispatch } = useEditStage();
  const { mutation, stageData } = useStageEditor();

  const { keyBoardHandlingStyle } = useKeyBoardHandler();

  const {
    visibility: confimationVisibility,
    setVisibility: setConfirmationVisibility,
    scaleStyle: confirmationScaleStyle,
    closeModal: confirmationCloseModal,
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
        className="flex-[1] justify-center items-center"
        onPress={closeModal}
      >
        <Pressable
          className="w-[80%] h-[70%]"
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <Animated.View
            className="  bg-accent  border-[2px] h-full border-[#56EBFF]"
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
                  dispatch={dispatch}
                  state={state}
                  stageData={stageData}
                ></GameComponent>

                <View className="flex-row my-3">
                  <TouchableOpacity className="px-7 py-2 bg-red-400 self-start mx-auto mt-2 rounded-lg">
                    <Text className="text-white font-exoBold">Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="px-7 py-2 bg-green-400 self-start mx-auto mt-2 rounded-lg "
                    onPress={() => {
                      setConfirmationVisibility(true);
                    }}
                  >
                    <Text className="text-white">Save</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
            <SaveToFirebaseConfirmation
              onConfirm={() => {
                mutation?.mutate({
                  state,
                  stageType: stageData?.type,
                });
                confirmationCloseModal();
              }}
              visibility={confimationVisibility}
              scaleStyle={confirmationScaleStyle}
              closeModal={confirmationCloseModal}
            ></SaveToFirebaseConfirmation>
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default EditStageModal;
