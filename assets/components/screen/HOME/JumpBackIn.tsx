import { categoryIcon } from "@/assets/constants/constants";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
type JumpBackInPayload = {
  handleJumpBackIn: () => void;
  lastOpenedLevel: {
    lessonId: string;
    levelId: string;
    subject: string;
    description: string;
    title: string;
  };
};
const JumpBackIn = ({
  handleJumpBackIn,
  lastOpenedLevel,
}: JumpBackInPayload) => {
  return (
    <>
      <Text className="text-white ml-3 mt-4 xs:text-lg font-exoBold tracking-wide">
        JUMP BACK IN
      </Text>
      <Pressable onPress={handleJumpBackIn} className="mx-3 my-2">
        <View className="flex-row items-center py-5 bg-accentContainer rounded-2xl overflow-hidden shadow-md p-3">
          <Image
            source={categoryIcon[lastOpenedLevel.subject]}
            className="w-14 h-14 rounded-lg"
          />
          <View className="flex-1 ml-3">
            <Text className="text-white xs:text-sm font-exoBold">
              {lastOpenedLevel.title}
            </Text>
            <Text
              className="text-gray-400 xs:text-xs font-exoLight mt-1"
              numberOfLines={2}
            >
              {lastOpenedLevel.description}
            </Text>
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default React.memo(JumpBackIn);

const styles = StyleSheet.create({});
