import { db } from "@/assets/constants/constants";
import useEditStage from "@/assets/Hooks/useEditStage";
import useModal from "@/assets/Hooks/useModal";
import tracker from "@/assets/zustand/tracker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteField,
  doc,
  FieldValue,
  getDoc,
  setDoc,
} from "firebase/firestore";
import React, { JSX } from "react";
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
import BugBust from "./GameModes/BugBust";
import CodeRush from "./GameModes/CodeRush";
import Lesson from "./GameModes/Lesson";
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

  const { state, dispatch } = useEditStage();
  const queryClient = useQueryClient();
  const { data: stageData } = useQuery({
    queryKey: [
      "stage",
      levelPayload?.category,
      levelPayload?.lessonId,
      levelPayload?.levelId,
      stageIdentifier,
    ],
    queryFn: async () => {
      if (!levelPayload || !stageIdentifier) {
        throw new Error("Something went wrong with the payload");
      }

      try {
        const stageRef = doc(
          db,
          levelPayload.category,
          levelPayload.lessonId,
          "Levels",
          levelPayload.levelId,
          "Stages",
          stageIdentifier
        );

        const stageData = await getDoc(stageRef);
        if (!stageData.exists()) {
          throw new Error("Data does not exist");
        }

        return stageData.data();
      } catch {}
    },
  });

  const filters: Record<
    string,
    { omit: string[]; toNumber?: (item: any) => void; toDelete: string[] }
  > = {
    Lesson: {
      omit: ["hint", "instruction", "timer"],
      toDelete: ["timer", "hint"],
    },
    BugBust: { omit: ["timer"], toDelete: ["instruction", "timer"] },
    CodeRush: {
      omit: ["hint"],
      toNumber: (item) => ({ ...item, timer: Number(item.timer) }),
      toDelete: ["hint", "instruction"],
    },
  };

  const mutation = useMutation({
    mutationFn: async ({ state }: { state: any }) => {
      try {
        if (!levelPayload || !stageIdentifier) {
          throw new Error("Something went wrong with the payload");
        }

        try {
          const stageRef = doc(
            db,
            levelPayload.category,
            levelPayload.lessonId,
            "Levels",
            levelPayload.levelId,
            "Stages",
            stageIdentifier
          );

          let filteredState = state;
          let filterDelete: Record<string, FieldValue> = {};

          const setFilter = filters[state.type ? state.type : stageData?.type];

          if (setFilter.omit) {
            filteredState = Object.fromEntries(
              Object.entries(state).filter(
                ([key]) => !setFilter.omit!.includes(key)
              )
            );
            setFilter.toDelete.forEach((key) => {
              filterDelete[key] = deleteField();
            });
          }

          if (setFilter.toNumber) {
            filteredState = setFilter.toNumber(filteredState);
          }
          await setDoc(
            stageRef,
            {
              ...filteredState,
              ...filterDelete,
              type: state.type ? state.type : stageData?.type,
            },
            { merge: true }
          );
        } catch {}
      } catch {
        throw new Error("Something went wwrong...");
      }
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

  const gameComponents: Record<string, JSX.Element> = {
    Lesson: <Lesson dispatch={dispatch} state={state} stageData={stageData} />,
    BugBust: (
      <BugBust dispatch={dispatch} state={state} stageData={stageData} />
    ),
    CodeRush: (
      <CodeRush
        dispatch={dispatch}
        state={state}
        stageData={stageData}
      ></CodeRush>
    ),
  };
  const {
    visibility: confimationVisibility,
    setVisibility: setConfirmationVisibility,
    scaleStyle: confirmationScaleStyle,
    closeModal: confirmationCloseModal,
  } = useModal();
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

                    if (item != "Lesson") {
                      dispatch({
                        type: "UPDATE_FIELD",
                        field: "isHidden",
                        value: true,
                      });
                    } else {
                      dispatch({
                        type: "UPDATE_FIELD",
                        field: "isHidden",
                        value: false,
                      });
                    }
                  }}
                  placeHolder={stageData?.type}
                  value={state.type}
                />
                {gameComponents[state.type ? state.type : stageData?.type] ??
                  null}
                <View className="flex-row my-3">
                  <TouchableOpacity className="px-7 py-2 bg-red-400 self-start mx-auto mt-2 rounded-lg">
                    <Text className="text-white font-exoBold">Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="px-7 py-2 bg-green-400 self-start mx-auto mt-2 rounded-lg "
                    onPress={() => {
                      mutation.mutate({ state });
                      // setConfirmationVisibility(true);
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
