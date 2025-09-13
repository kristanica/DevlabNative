import EditLesson from "@/assets/Hooks/query/EditLesson";

import useLevelMutation from "@/assets/Hooks/useLevelMutation";
import levelIdentifier from "@/assets/zustand/levelIdentifier";
import { useQuery } from "@tanstack/react-query";
import React from "react";
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
import InputContainer from "../components/AdminComponents/InputContainer";
import useEditLevel from "./useEditLevel";
type AddLessonModalProps = {
  visibility: boolean;
  scaleStyle: AnimatedStyle<ViewStyle>;
  closeModal: () => void;
};
const EditLevelModal = ({
  visibility,
  scaleStyle,
  closeModal,
}: AddLessonModalProps) => {
  const gameLevelIden = levelIdentifier((state) => state.levelIdentifier);

  const { state, dispatch } = useEditLevel();
  const mutation = useLevelMutation();
  const { data: levelData } = useQuery({
    queryKey: [
      "level",
      gameLevelIden?.category,
      gameLevelIden?.lessonId,
      gameLevelIden?.levelId,
    ],
    queryFn: EditLesson,
  });
  return (
    <Modal visible={visibility} transparent={true}>
      <Pressable
        className="flex-[1] justify-center items-center"
        onPress={closeModal}
      >
        <Pressable className="w-[80%] h-[70%]" onPress={() => {}}>
          <Animated.View
            className="  bg-accent border-[2px] border-[#A78BFA] "
            style={[scaleStyle]}
          >
            <ScrollView
              showsVerticalScrollIndicator={true}
              alwaysBounceVertical={false}
              className="   rounded-xl p-2 h-full  "
            >
              <View className="bg-background h-[50px] border-[2px] border-[#56EBFF] justify-center rounded-2xl">
                <Text className="text-white  ml-2">
                  Editing: {gameLevelIden?.lessonId} {gameLevelIden?.levelId}
                </Text>
              </View>
              <InputContainer
                numeric={false}
                title={"Title"}
                placeholder={levelData?.title}
                value={state.title}
                setValue={(text) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    field: "title",
                    value: text,
                  })
                }
              ></InputContainer>
              <InputContainer
                numeric={false}
                title={"Description"}
                placeholder={levelData?.desc}
                value={state.desc}
                setValue={(text) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    field: "desc",
                    value: text,
                  })
                }
              ></InputContainer>
              <InputContainer
                numeric={true}
                title={"Coin Reward"}
                placeholder={String(levelData?.coinsReward ?? "")}
                value={String(state.coinsReward ?? "")}
                setValue={(text) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    field: "coinsReward",
                    value: text,
                  })
                }
              ></InputContainer>

              <InputContainer
                numeric={true}
                title={"Exp Reward"}
                placeholder={String(levelData?.expReward ?? "")}
                value={String(state.expReward ?? "")}
                setValue={(text) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    field: "expReward",
                    value: text,
                  })
                }
              ></InputContainer>
              <View className="justify-evenly items-center flex-row my-7">
                <TouchableOpacity>
                  <Text className="rounded-xl text-white font-exoBold py-2 px-7 bg-red-700 self-start">
                    Delete
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    mutation.mutate({ updateLevelInformation: state });
                    console.log(state);
                  }}
                >
                  <Text className="rounded-xl text-white font-exoBold py-2 px-7 bg-green-700 self-start">
                    Save Changes
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default EditLevelModal;
