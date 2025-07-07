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
      {item.status ? null : (
        <>
          <View className="absolute w-full z-10 rounded-3xl bg-black opacity-[.6] h-full justify-center items-center"></View>
          <View className="flex-1 justify-center items-center absolute z-20 h-full w-full">
            <Ionicons name={"lock-closed"} color={"white"} size={40} />
          </View>
        </>
      )}

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
        <Text numberOfLines={2} className="text-[#94A1B2] text-sm w-[15%] ">
          {item.desc}
        </Text>
      </View>
    </Animated.View>
  );
};

export default LessonContainer;

const styles = StyleSheet.create({});
