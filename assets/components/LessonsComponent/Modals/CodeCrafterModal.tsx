import { ScaleModalProps } from "@/assets/constants/type";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const CodeCrafterModal = ({
  visibility,
  scaleStyle,
  closeModal,
  onConfirm,
}: ScaleModalProps) => {
  return (
    <Modal visible={visibility} animationType="fade" transparent={true}>
      <Pressable onPress={closeModal} className="flex-1 bg-black/50">
        <Animated.View
          style={[scaleStyle]}
          className="aspect-square w-5/6 max-w-[350px] m-auto rounded-3xl shadow-2xl shadow-black/80"
        >
          <View className="flex-1 bg-[#16161A] border-[#2a3141] border-[1px] rounded-3xl p-5 justify-center items-center">
            <Text className="text-white font-exoBold text-center text-base mb-3">
              Welcome to <Text className="text-[#7F5AF0]">Code Crafter</Text> —
              a coding challenge that tests both your creativity and precision!
            </Text>

            <Text className="text-white/90 font-exoBold text-xs xs:text-[10px] text-center">
              🧠 Read the instructions carefully — your task can vary depending
              on what’s shown.
            </Text>
            <View className="w-full mt-2">
              <Text className="text-white/90 font-exoBold text-xs xs:text-[10px] text-center">
                🧱 Write a solution that meets the given requirements.
              </Text>
              <Text className="text-white/90 font-exoBold text-xs xs:text-[10px] text-center">
                🚀 Execute your code and make sure it behaves as expected!
              </Text>

              <Text className="text-white/90 mt-2 font-exoBold text-xs xs:text-[10px] text-center">
                Whether you’re recreating outputs or solving problems,
                CodeCrafter is where you turn logic into creation.
              </Text>
            </View>
            {/* <View className="flex-[1] w-full flex-row p-2 justify-evenly items-center">
                  <Pressable onPress={onConfirm}>
                    <Text className="text-white py-2 px-7 font-exoBold self-start xs:text-[8px] bg-[#7F5AF0] rounded-2xl">
                      Continue
                    </Text>
                  </Pressable>
                </View> */}
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default React.memo(CodeCrafterModal);

const styles = StyleSheet.create({});
