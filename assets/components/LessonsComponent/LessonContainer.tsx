import useSequentialAppearAnim from "@/assets/Hooks/useSequentialAppearAnim";
import { fontFamily } from "@/fontFamily/fontFamily";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

type LessonContainerProps = {
  item: any;
  index: number;
  icon: "cube" | "logo-javascript" | "logo-html5" | "logo-css3";
};

const LessonContainer = ({ item, index, icon }: LessonContainerProps) => {
  const isFocused = useIsFocused();

  const { onScale } = useSequentialAppearAnim({
    indicator: isFocused,
    id: index,
  });

  return (
    <Animated.View
      key={item.id}
      style={onScale}
      className="bg-shopAccent rounded-3xl h-28 flex-row my-2 border-black border-[2px]"
    >
      <View className="w-[25%] justify-center items-center bg-black rounded-3xl">
        <Ionicons name={icon} color={"white"} size={50} />
      </View>

      <View className="justify-center items-start ml-3">
        <Text
          className="text-white text-2xl"
          style={{ fontFamily: fontFamily.ExoBold }}
        >
          {item.title}
        </Text>
        <Text className="text-[#94A1B2] text-sm">{item.desc}</Text>
      </View>
    </Animated.View>
  );
};

export default LessonContainer;

const styles = StyleSheet.create({});
