import useSequentialAppearAnim from "@/assets/Hooks/useSequentialAppearAnim";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

type LessonContainerProps = {
  item: any;
  index: number;
  icon: "cube" | "logo-javascript" | "logo-html5" | "logo-css3";
  isLocked: boolean | undefined;
};

const LessonContainer = ({
  item,
  index,
  icon,
  isLocked,
}: LessonContainerProps) => {
  const isFocused = useIsFocused();

  const { onScale } = useSequentialAppearAnim({
    indicator: isFocused,
    id: index,
  });

  return (
    <Animated.View
      key={item.id}
      style={onScale}
      className="bg-shopAccent rounded-3xl h-28 flex-row my-2 border-black border-[2px] mx-3"
    >
      {isLocked && (
        <>
          <View className="absolute inset-0 z-10 rounded-2xl bg-black opacity-60" />
          <View className="absolute inset-0 z-20 flex-1 justify-center items-center">
            <Ionicons name="lock-closed" color="white" size={40} />
          </View>
        </>
      )}
      <View className="justify-center items-center w-[20%] bg-black rounded-3xl">
        <Ionicons name={icon} color={"white"} size={40} />
      </View>
      <View className="w-[80%] px-3 py-3">
        <Text className="text-white font-exoBold text-xl">{item.title}</Text>
        <Text
          className="text-[#eeebf29d] font-exoLight text-sm"
          numberOfLines={2}
        >
          {item.description}
        </Text>
      </View>
    </Animated.View>
  );
};

export default LessonContainer;

const styles = StyleSheet.create({});
