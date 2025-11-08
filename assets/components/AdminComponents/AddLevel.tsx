import uploadVideo from "@/assets/API/fireBase/admin/stage/uploadVideo";
import CheckEmptyFields from "@/assets/Hooks/function/CheckEmptyFields";
import useEditLesson from "@/assets/Hooks/reducers/useEditLesson";
import useEditStage from "@/assets/Hooks/reducers/useEditStage";
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
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated from "react-native-reanimated";
import FillScreenLoading from "../global/FillScreenLoading";
import Lesson from "./GameModes/Lesson";
import InputContainer from "./InputContainer";

const AddLevel = ({
  visibility,
  scaleStyle,
  closeModal,
}: ScaleModalPayload) => {
  // reducer for stage
  const { state: stateStage, dispatch: dispatchStage } = useEditStage();

  // reducer for level
  const { state, dispatch } = useEditLesson();
  const initialState = {
    title: "A new stage is automatically created",
    description: "This is your first stage...",
    instruction: "",
    codingInterface: "",

    isHidden: false,
    timer: "",
    type: "Lesson",
    choices: [],
    blocks: [],
  };

  const [videoPresentation, setVideoPresentation] = useState<string>("");
  const category = tracker((state) => state.levelPayload?.category);
  const lessonId = tracker((state) => state.levelPayload?.lessonId);
  const querClient = useQueryClient();

  const allinone = useMutation({
    mutationFn: async ({ stateStage, state, category }: any) => {
      const formData = new FormData();

      formData.append("category", category);
      formData.append("lessonId", String(lessonId));
      formData.append("lessonState", JSON.stringify(state));

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
        `${URL}/fireBaseAdmin/addNewLevel`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status !== 200 || !response.data.newLevelId) {
        throw new Error("addNewLevel failed or missing nextLevelId");
      }

      // Upload video if present
      if (videoPresentation) {
        await uploadVideo({
          video: videoPresentation,
          category,
          lessonId: String(lessonId),
          levelId: response.data.newLevelId,
          stageId: "Stage1",
        });
        console.log("🎥 Video uploaded successfully");
      }

      return response.data;
    },
    onSuccess: () => {
      console.log("incalidating queriess");

      querClient.invalidateQueries({ queryKey: ["lesson admin", category] });
    },
    onSettled: () => {
      closeModal();
    },
  });
  const isMutating = useIsMutating();

  const setToastVisibility = toastHandler((state) => state.setToastVisibility);

  useEffect(() => {
    dispatchStage({ type: "UPDATE_FIELD", field: "type", value: "Lesson" });
  }, []);

  return (
    <Modal visible={visibility} transparent={true}>
      {isMutating > 0 && <FillScreenLoading></FillScreenLoading>}
      <View className="flex-[1] justify-center items-center bg-black/50">
        <View className="w-full px-2 h-[90%] ">
          <KeyboardAwareScrollView
            contentContainerStyle={{}}
            enableOnAndroid
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Animated.View
              className="bg-modal  border-[#2a3141] border-[1px] rounded-xl"
              style={[scaleStyle]}
            >
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={20} color={"white"}></Ionicons>
              </TouchableOpacity>

              <Text className="text-white text-center">
                Edit details for the first Level of this new lesson
              </Text>
              <InputContainer
                title={"Title"}
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

              <View className="flex-row ">
                <InputContainer
                  title={"Exp Reward"}
                  value={state.expReward}
                  setValue={(text) => {
                    dispatch({
                      type: "UPDATE_LESSON_FIELD",
                      field: "expReward",
                      value: text,
                    });
                  }}
                  numeric={true}
                ></InputContainer>
                <InputContainer
                  title={"Exp Reward"}
                  value={state.coinsReward}
                  setValue={(text) => {
                    dispatch({
                      type: "UPDATE_LESSON_FIELD",
                      field: "coinsReward",
                      value: text,
                    });
                  }}
                  numeric={true}
                ></InputContainer>
              </View>

              <View className="h-[1px] bg-white my-3 mx-3"></View>
              <Text className="text-white text-center">
                Edit details for the first stage of this new lesson First stage
                is defaulted to lesson
              </Text>
              <Lesson
                stageData={initialState}
                dispatch={dispatchStage}
                state={stateStage}
                setVideoPresentation={setVideoPresentation}
                videoPresentation={videoPresentation}
              />

              <TouchableOpacity
                onPress={() => {
                  {
                    const hasEmptyLevelFields = CheckEmptyFields(
                      state,
                      "Level"
                    );
                    const hasEmptyStageField = CheckEmptyFields(
                      stateStage,
                      stateStage.type
                    );
                    if (hasEmptyLevelFields || hasEmptyStageField) {
                      setToastVisibility("error", "Empty field!");
                      return;
                    }

                    allinone.mutate({ stateStage, state, category });
                  }
                }}
              >
                <Text className="text-white bg-green-500 mx-2 text-center rounded-xl my-2 py-2 font-exoBold">
                  Confirm
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddLevel;
