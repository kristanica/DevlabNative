import customQuery from "@/assets/Hooks/function/customQuery";
import GameComponent from "@/assets/Hooks/function/GameComponent";
import getStageData from "@/assets/Hooks/query/getStageData";
import editStage from "@/assets/Hooks/query/mutation/editStage";
import useEditStage from "@/assets/Hooks/useEditStage";
import useModal from "@/assets/Hooks/useModal";
import tracker from "@/assets/zustand/tracker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const levelPayload = tracker((state) => state.levelPayload);
  const stageIdentifier = tracker((state) => state.stageId);

  if (!levelPayload || !stageIdentifier) {
    return;
  }

  const { state, dispatch } = useEditStage();
  const queryClient = useQueryClient();

  const { data: stageData } = customQuery(
    [
      "stage",
      levelPayload.category,
      levelPayload.lessonId,
      levelPayload.levelId,
      stageIdentifier,
    ],
    getStageData
  );

  const mutation = useMutation({
    mutationFn: async ({
      state,
      stageType,
    }: {
      state: any;
      stageType: string;
    }) => {
      return await editStage(state, stageType);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "stage",
          levelPayload?.category,
          levelPayload?.lessonId,
          levelPayload?.levelId,
          stageIdentifier,
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

  const {
    visibility: confimationVisibility,
    setVisibility: setConfirmationVisibility,
    scaleStyle: confirmationScaleStyle,
    closeModal: confirmationCloseModal,
  } = useModal();

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
            style={[scaleStyle]}
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
                    Stage Visibility{" "}
                  </Text>
                  <Text className="text-white border-[#a8b3b575] border-[2px] rounded-xl p-2 my-2">
                    {stageData?.isHidden ? "Hidden" : "Visibile"}
                  </Text>
                </View>
                <DropDownMenu
                  onSelect={(item) => {
                    dispatch({
                      type: "UPDATE_FIELD",
                      field: "type",
                      value: item,
                    });

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
                      mutation.mutate({
                        state,
                        stageType: stageData?.type,
                      });
                    }}
                  >
                    <Text className="text-white">Save</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
            <SaveToFirebaseConfirmation
              state={state}
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
