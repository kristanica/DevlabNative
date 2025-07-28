import { db, gameModes } from "@/assets/constants/constants";
import gameIdentifier from "@/assets/zustand/gameIdentifier";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import React, { JSX, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";
import BrainBytes from "./GameModes/BrainBytes";
import BugBustGame from "./GameModes/BugBustGame";
import CodeCrafter from "./GameModes/CodeCrafter";
import CodeRush from "./GameModes/CodeRush";
import LessonGame from "./GameModes/LessonGame";

type AddLessonModalProps = {
  visibility: boolean;
  scaleStyle: AnimatedStyle<ViewStyle>;
  closeModal: () => void;
};
const AddLessonModal = ({
  visibility,
  scaleStyle,
  closeModal,
}: AddLessonModalProps) => {
  const [category, setCategory] = useState<string>("Lesson");

  const gameIdenData = gameIdentifier((state) => state.data);
  const gameIdenSetter = gameIdentifier((state) => state.setGameIdentifer);

  const { data: gameModeData } = useQuery({
    queryKey: ["gamemode", category, gameIdenData?.topicId],
    queryFn: async () => {
      if (!gameIdenData) {
        throw new Error("Gamemode identifier is undefined");
      }
      try {
        const gameModeRef = doc(
          db,
          gameIdenData?.subject,
          gameIdenData?.lessonId,
          "Levels",
          gameIdenData?.levelId,
          "Topics",
          gameIdenData?.topicId,
          "Gamemodes",
          category
        );

        gameIdenSetter({ ...gameIdenData, gameCategory: category });

        const data = await getDoc(gameModeRef);

        if (!data.exists()) {
          throw new Error("Data does not exist");
        }
        return data.data();
      } catch (error) {
        throw new Error("error");
      }
    },
    enabled:
      visibility &&
      !!gameIdenData?.subject &&
      !!gameIdenData?.lessonId &&
      !!gameIdenData?.levelId &&
      !!gameIdenData?.topicId &&
      !!category,
  });

  const gameComponents: Record<string, JSX.Element> = {
    Lesson: <LessonGame data={gameModeData} />,
    BugBust: <BugBustGame data={gameModeData} />,
    CodeCrafter: <CodeCrafter data={gameModeData} />,
    BrainBytes: <BrainBytes data={gameModeData} />,
    CodeRush: <CodeRush data={gameModeData} />,
  };

  return (
    <Modal visible={visibility} transparent={true}>
      <Pressable
        className="flex-[1] justify-center items-center"
        onPress={closeModal}
      >
        <Pressable className="w-[80%] h-[70%]" onPress={() => {}}>
          <Animated.View
            className="  bg-accent  border-[2px] border-[#56EBFF]"
            style={[scaleStyle]}
          >
            <FlatList
              horizontal
              data={gameModes}
              contentContainerStyle={{ marginVertical: 20 }}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setCategory(item)}>
                  <Text className="text-white bg-button px-2 py-3 mx-4 rounded-xl">
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            ></FlatList>
            <ScrollView
              showsVerticalScrollIndicator={true}
              alwaysBounceVertical={false}
              className="   rounded-xl p-2 h-[90%]"
            >
              <View className="bg-background h-[50px] border-[#56EBFF] border-[2px]  justify-center rounded-2xl">
                <Text className="text-white  ml-2">Editing: </Text>
              </View>
              <View className="justify-center items-center">
                <Text className="text-white text-2xl font-exoBold">
                  {category}
                </Text>
              </View>
              {/* <InputContainer
                title={"Level Title"}
                placeholder="Test"
              ></InputContainer>
              <InputContainer
                title={"Level Description"}
                placeholder="Test"
              ></InputContainer> */}

              {/* Cycles between different gamemodes */}
              {gameComponents[category] ?? null}
            </ScrollView>
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default AddLessonModal;
