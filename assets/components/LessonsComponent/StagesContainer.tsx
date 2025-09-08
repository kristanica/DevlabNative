import useSequentialAppearAnim from "@/assets/Hooks/useSequentialAppearAnim";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

type StageContainerProps = {
  item: any;
  index: number;
  isLocked?: { status: boolean };
};
const StagesContainer = ({ item, index, isLocked }: StageContainerProps) => {
  const isFocused = useIsFocused();

  const { onScale } = useSequentialAppearAnim({
    indicator: isFocused,
    id: index,
  });
  return (
    <Animated.View
      style={onScale}
      className="bg-[#111827] my-2 rounded-2xl border-2 border-black h-40 p-3 mx-3 relative"
    >
      {isLocked?.status && (
        <>
          <View className="absolute inset-0 z-10 rounded-2xl bg-black opacity-60" />
          <View className="absolute inset-0 z-20 flex-1 justify-center items-center">
            <Ionicons name="lock-closed" color="white" size={40} />
          </View>
        </>
      )}

      <View>
        <Text className="text-white font-exoBold text-2xl">{item.title}</Text>
      </View>

      <View className="mt-2">
        <Text
          className="text-[#94A1B2] text-sm text-justify font-exoLight"
          numberOfLines={3}
        >
          {item.description}
        </Text>
      </View>
    </Animated.View>
  );
};

export default StagesContainer;

const styles = StyleSheet.create({});
