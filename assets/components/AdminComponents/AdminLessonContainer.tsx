import { db } from "@/assets/constants/constants";
import useSequentialAppearAnim from "@/assets/Hooks/useSequentialAppearAnim";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated from "react-native-reanimated";

type AdminLessonContainerProps = {
  item: any;
  index: number;
};

const AdminLessonContainer = ({ item, index }: AdminLessonContainerProps) => {
  const isFocused = useIsFocused();
  const { onScale } = useSequentialAppearAnim({
    indicator: isFocused,
    id: index,
  });

  const [gameModeData, setGameModeData] = useState<any>([]);
  const fetchGameModes = async (activeTab: string) => {
    const gmDb = doc(
      db,
      "Html",
      "Lesson1",
      "Levels",
      "Level1",
      "Gamemode",
      activeTab
    );
    const gmData = await getDoc(gmDb);
    if (gmData.exists()) {
      setGameModeData(gmData.data());
    } else {
      setGameModeData(null);
    }

    console.log(gameModeData);
  };
  return (
    <Animated.View
      style={onScale}
      className="bg-[#111827] my-2 rounded-2xl border-[2px] border-[#56EBFF] h-48 p-3 mx-3"
    >
      <View>
        <Text className="text-white font-exoBold text-2xl">{item.title}</Text>
      </View>

      <View className="my-2">
        <Text className="text-[#94A1B2] text-sm  text-justify font-exoLight ">
          {item.desc}
        </Text>
      </View>

      <View className="flex-row items-center justify-between mr-3">
        <Text className="text-white font-exoLight text-sm bg-[#182138] py-2 px-7 rounded-2xl">
          {item.type}
        </Text>
        <Pressable onPress={() => fetchGameModes("BugBust")}>
          <Ionicons name="pencil" size={25} color="white"></Ionicons>
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default AdminLessonContainer;
