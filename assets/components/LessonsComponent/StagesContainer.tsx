import useSequentialAppearAnim from "@/assets/Hooks/useSequentialAppearAnim";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const StagesContainer = ({ stageInformation, index, isLocked }: any) => {
  const isFocused = useIsFocused();

  const { onScale } = useSequentialAppearAnim({
    indicator: isFocused,
    id: index,
  });

  return (
    <Animated.View
      style={[
        onScale,
        {
          backgroundColor:
            stageInformation.type === "Lesson" ? "#111827" : "#2B1118",
        },
      ]}
      className="my-2 rounded-2xl border-2 border-black h-28 p-3 mx-3 relative"
    >
      {!isLocked && (
        <>
          <View className="absolute inset-0 z-10 rounded-2xl bg-black opacity-60" />
          <View className="absolute inset-0 z-20 flex-1 justify-center items-center">
            <Ionicons name="lock-closed" color="white" size={40} />
          </View>
        </>
      )}

      <View>
        <Text className="text-white font-exoBold  text-xl xs:text-[12px]">
          {stageInformation.title}
        </Text>
      </View>

      <View className="mt-2">
        <Text
          className="text-[#94A1B2] text-justify font-exoLight text-xs xs:text-[9px]"
          numberOfLines={3}
        >
          {stageInformation.description}
        </Text>
      </View>
    </Animated.View>
  );
};

export default StagesContainer;

const styles = StyleSheet.create({});
