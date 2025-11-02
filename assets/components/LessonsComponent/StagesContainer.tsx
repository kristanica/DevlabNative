import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const StagesContainer = ({ stageInformation, isLocked }: any) => {
  return (
    <Animated.View className="bg-[#1f1e2e] my-2 rounded-2xl h-28 p-3 mx-3 relative">
      {!isLocked && (
        <>
          <View className="absolute inset-0 z-10 rounded-2xl bg-black opacity-60" />
          <View className="absolute inset-0 z-20 flex-1 justify-center items-center">
            <Ionicons name="lock-closed" color="white" size={40} />
          </View>
        </>
      )}

      <View>
        <Text
          className={`font-exoBold  text-xl xs:text-[12px]  ${
            stageInformation.type === "Lesson" ? "text-white" : "text-red-500"
          }`}
        >
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
