import uploadVideo from "@/assets/API/fireBase/admin/stage/uploadVideo";
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
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated from "react-native-reanimated";
import FillScreenLoading from "../global/FillScreenLoading";
import Lesson from "./GameModes/Lesson";
import InputContainer from "./InputContainer";

const AddLesson = ({
  visibility,
  scaleStyle,
  closeModal,
}: ScaleModalPayload) => {
  const { state: stateStage, dispatch: dispatchStage } = useEditStage();
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
  const querClient = useQueryClient();
  const setToastVisibility = toastHandler((state) => state.setToastVisibility);
  const allinone = useMutation({
    mutationFn: async ({ stateStage, state, category }: any) => {
      const formData = new FormData();

      formData.append("category", category);
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
        `${URL}/fireBaseAdmin/addNewLesson`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status !== 200 || !response.data.nextLessonId) {
        throw new Error("addNewLesson failed or missing nextLessonId");
      }

      console.log("✅ Lesson added successfully:", response.data);

      // Upload video if present
      if (videoPresentation) {
        await uploadVideo({
          video: videoPresentation,
          category,
          lessonId: response.data.nextLessonId,
          levelId: "Level1",
          stageId: "Stage1",
        });
        console.log("🎥 Video uploaded successfully");
      }

      return response.data;
    },
    onSuccess: () => {
      querClient.invalidateQueries({ queryKey: ["lesson admin", category] });
      closeModal();
    },
  });
  const isMutating = useIsMutating();

  const isLevelEmpty = (state: {
    title: string;
    description: string;
    coinsReward: number;
    expReward: number;
  }) =>
    !state.title ||
    !state.description ||
    state.coinsReward === undefined ||
    state.expReward === undefined;
  return (
    <Modal visible={visibility} transparent={true}>
      {isMutating > 0 && <FillScreenLoading></FillScreenLoading>}
      <View className="flex-[1] justify-center items-center bg-black/50">
        <View className="w-full px-2 h-[90%]">
          <KeyboardAwareScrollView
            contentContainerStyle={{}}
            enableOnAndroid
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Animated.View
              className="bg-modal px-2 border-[#2a3141] border-[1px] rounded-xl"
              style={[scaleStyle]}
            >
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={20} color={"white"}></Ionicons>
              </TouchableOpacity>
              {/* Only render Lesson after state is initialized */}
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
              <Lesson
                stageData={initialState}
                dispatch={dispatchStage}
                state={stateStage}
                setVideoPresentation={setVideoPresentation}
              />

              <TouchableOpacity
                onPress={() => {
                  {
                    if (isLevelEmpty(state)) {
                      setToastVisibility("error", "Empty field");
                      console.log("Empty field");
                      return; // stop here, don't call mutate
                    }

                    allinone.mutate({ stateStage, state, category });
                  }
                }}
              >
                <Text className="text-white">HELLO</Text>
              </TouchableOpacity>
            </Animated.View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddLesson;
