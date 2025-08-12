import { db } from "@/assets/constants/constants";
import useEditStage from "@/assets/Hooks/useEditStage";
import tracker from "@/assets/zustand/tracker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  Keyboard,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Animated, { AnimatedStyle } from "react-native-reanimated";
import InputContainer from "./InputContainer";
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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "BUG BUST", value: "bugBust" },
    { label: "BRAIN BYTES", value: "brainBytes" },
    { label: "CODE CRAFTER", value: "codeCrafter" },
    { label: "CODE RUSH", value: "codeRush" },
    { label: "LESSON", value: "lesson" },
  ]);
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
          await setDoc(stageRef, state, { merge: true });
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
            {/* <InputContainer
              title={"Visibility"}
              placeholder={String(stageData?.isHidden)}
              value={String(state.isHidden ?? "")}
              setValue={(text) => {
                dispatch({
                  type: "UPDATE_FIELD",
                  field: "isHidden",
                  value: text,
                });
              }}
              numeric={false}
            ></InputContainer> */}

            <TouchableOpacity
              className="px-7 py-2  bg-green-400 self-start mx-auto mt-2 rounded-lg"
              onPress={() => {
                mutation.mutate({ state });
              }}
            >
              <Text className="text-white">Save</Text>
            </TouchableOpacity>
            <InputContainer
              title={"Title"}
              placeholder={stageData?.title}
              value={state.title}
              setValue={(text) => {
                dispatch({ type: "UPDATE_FIELD", field: "title", value: text });
              }}
              numeric={false}
            ></InputContainer>

            <InputContainer
              title={"Description"}
              placeholder={stageData?.description}
              value={state.description}
              setValue={(text) => {
                dispatch({
                  type: "UPDATE_FIELD",
                  field: "description",
                  value: text,
                });
              }}
              numeric={false}
            ></InputContainer>

            <InputContainer
              title={"Coins Reward"}
              placeholder={String(stageData?.coinsReward)}
              value={String(state.coinsReward ?? "")}
              setValue={(text) => {
                dispatch({
                  type: "UPDATE_FIELD",
                  field: "coinsReward",
                  value: text,
                });
              }}
              numeric={true}
            ></InputContainer>
            <InputContainer
              title={"Experience Points"}
              placeholder={String(stageData?.expReward)}
              value={String(state.expReward ?? "")}
              setValue={(text) => {
                dispatch({
                  type: "UPDATE_FIELD",
                  field: "expReward",
                  value: text,
                });
              }}
              numeric={true}
            ></InputContainer>
            <View style={{ padding: 20 }}>
              <DropDownPicker
                open={open}
                value={state.type}
                items={items}
                setOpen={setOpen}
                style={{ backgroundColor: "#0D1117", borderColor: "#56EBFF" }}
                textStyle={{
                  color: "white",
                }}
                dropDownContainerStyle={{
                  backgroundColor: "#0D1117",
                  borderColor: "#56EBFF",
                  borderTopWidth: 0,
                }}
                placeholder={state.type ? state.type : stageData?.type}
                setValue={(callback) => {
                  setValue((current) => {
                    const newValue = callback(current);
                    dispatch({
                      type: "UPDATE_FIELD",
                      field: "type",
                      value: String(newValue),
                    });
                    return newValue;
                  });
                }}
              />
            </View>
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default EditStageModal;
