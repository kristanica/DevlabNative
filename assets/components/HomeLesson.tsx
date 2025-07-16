import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

import { useIsFocused } from "@react-navigation/native";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";
import useSequentialAppearAnim from "../Hooks/useSequentialAppearAnim";
import { boxShadow } from "../styles/ContainerStyles";

type HomeLessonProps = {
  name: string;
  color: string;
  index: number;
  // Recieves icon for <Ionicons>
  icon: keyof typeof Ionicons.glyphMap;
};
// HomeLesson component for (Tabs)/Home.tsx
const HomeLesson = ({ name, color, icon, index }: HomeLessonProps) => {
  const isFocused = useIsFocused();
  const { onScale } = useSequentialAppearAnim({
    indicator: isFocused,
    id: index,
  });
  return (
    <Animated.View
      style={[{}, boxShadow.shadow2, onScale]}
      className=" w-[40%]  h-[200px] bg-accentContainer mx-3 my-2 rounded-2xl overflow-hidden "
    >
      <View
        style={{ backgroundColor: color }}
        className="h-[70%] justify-center items-center rounded-br-none rounded-bl-none"
      >
        <Ionicons name={icon} size={70} color={"white"} />
      </View>
      {/* Render's Name */}
      <View className="h-[30%] justify-center items-center text-center">
        <Text className="text-white font-exoBold">{name}</Text>
      </View>
    </Animated.View>
  );
};

export default HomeLesson;
