import { ScaleModalProps } from "@/assets/constants/type";
import CheckEmptyFields from "@/assets/Hooks/function/CheckEmptyFields";

import useLevelEditor from "@/assets/Hooks/query/mutation/useLevelEditor";
import useEditLesson from "@/assets/Hooks/reducers/useEditLesson";
import useKeyBoardHandler from "@/assets/Hooks/useKeyBoardHandler";
import useModal from "@/assets/Hooks/useModal";
import tracker from "@/assets/zustand/tracker";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import InputContainer from "./InputContainer";
import SaveToFirebaseConfirmation from "./SaveToFirebaseConfirmation";

const EditLessonModal = ({
  visibility,
  scaleStyle,
  closeModal,
}: ScaleModalProps) => {
  const { state, dispatch } = useEditLesson();
  const { levelData, updateLevelMutation, deleteLevelMutation } =
    useLevelEditor();

  const { keyBoardHandlingStyle } = useKeyBoardHandler();

  const confirmationModal = useModal();
  const payload = tracker((state) => state.levelPayload);

  return (
    <Modal visible={visibility} transparent={true}>
      <Pressable
        className="flex-[1] justify-center items-center bg-black/30 "
        onPress={closeModal}
      >
        <Pressable
          className="w-[80%] h-[55%]"
          onPress={(e) => {
            e.stopPropagation();
          }}
        >
          <Animated.View
            className="  bg-accent  border-[2px] h-full border-[#ffffff43] rounded-xl p-4"
            style={[scaleStyle, keyBoardHandlingStyle]}
          >
            <InputContainer
              title={"Title"}
              placeholder={levelData?.title ?? ""}
              value={state.title}
              setValue={(text) => {
                dispatch({
                  type: "UPDATE_LESSON_FIELD",
                  field: "title",
                  value: text,
                });
              }}
              numeric={false}
            ></InputContainer>
            <InputContainer
              title={"Description"}
              placeholder={levelData?.description ?? ""}
              value={state.description}
              setValue={(text) => {
                dispatch({
                  type: "UPDATE_LESSON_FIELD",
                  field: "description",
                  value: text,
                });
              }}
              numeric={false}
            ></InputContainer>
            <InputContainer
              title={"Exp Reward"}
              placeholder={String(levelData?.expReward) ?? ""}
              value={state.expReward}
              setValue={(text) => {
                dispatch({
                  type: "UPDATE_LESSON_FIELD",
                  field: "expReward",
                  value: text,
                });
              }}
              numeric={false}
            ></InputContainer>
            <InputContainer
              title={"Coins Reward"}
              placeholder={String(levelData?.coinsReward) ?? ""}
              value={state.coinsReward}
              setValue={(text) => {
                dispatch({
                  type: "UPDATE_LESSON_FIELD",
                  field: "coinsReward",
                  value: text,
                });
              }}
              numeric={false}
            ></InputContainer>

            <View className="flex-row my-3">
              <TouchableOpacity
                className="px-7 py-2 bg-red-400 self-start mx-auto mt-2 rounded-lg"
                onPress={() => {
                  deleteLevelMutation.mutate();
                  closeModal();
                }}
              >
                <Text className="text-white font-exoBold">Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="px-7 py-2 bg-green-400 self-start mx-auto mt-2 rounded-lg "
                onPress={() => {
                  confirmationModal.setVisibility(true);
                }}
              >
                <Text className="text-white">Save</Text>
              </TouchableOpacity>
            </View>

            {confirmationModal.visibility && (
              <SaveToFirebaseConfirmation
                onConfirm={() => {
                  const hasEmpty = CheckEmptyFields(state, "Level");

                  if (hasEmpty) {
                    console.log("ONe of the fields is empty");
                    return;
                  }
                  updateLevelMutation.mutate({ state });
                  confirmationModal.closeModal();
                }}
                visibility={confirmationModal.visibility}
                scaleStyle={confirmationModal.scaleStyle}
                closeModal={confirmationModal.closeModal}
              ></SaveToFirebaseConfirmation>
            )}
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default EditLessonModal;

const styles = StyleSheet.create({});
