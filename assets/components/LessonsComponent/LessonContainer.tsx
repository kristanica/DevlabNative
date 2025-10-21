import useSequentialAppearAnim from "@/assets/Hooks/useSequentialAppearAnim";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const LessonContainer = ({
  levelInformation,
  index,
  icon,
  isLocked,
  isShown,
}: any) => {
  const isFocused = useIsFocused();

  const { onScale } = useSequentialAppearAnim({
    indicator: isFocused,
    id: index,
  });
  console.log(isShown + "A");
  return (
    <Animated.View
      key={levelInformation.id}
      style={onScale}
      className={`bg-shopAccent ${
        isShown ? "" : "rounded-3xl"
      }  h-28 flex-row mt-2 border-black border-[2px] mx-3`}
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
        <Text className="text-white font-exoBold text-xl xs:text-[12px]">
          {levelInformation.title}
        </Text>
        <Text
          className="text-[#eeebf29d] font-exoLight text-xs xs:text-[9px]"
          numberOfLines={2}
        >
          {levelInformation.description}
        </Text>
      </View>
    </Animated.View>
  );
};

export default LessonContainer;

const styles = StyleSheet.create({});
