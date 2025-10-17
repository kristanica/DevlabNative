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
          <View className="flex-1 bg-[#16161A] border border-[#7F5AF0]/40 rounded-3xl p-5 justify-center items-center">
            <Text className="text-white font-exoBold xs:text-sm text-justify">
              Welcome to CodeCrafter — a coding challenge that tests both your
              creativity and precision!
            </Text>

            <Text className="text-white font-exoBold xs:text-sm mt-2">
              🧠 Read the instructions carefully — your task can vary depending
              on what’s shown.
            </Text>

            <Text className="text-white font-exoBold xs:text-sm mt-2">
              💡 If you see a sample output:
            </Text>
            <Text className="text-white font-exoBold xs:text-sm">
              🧩 Replicate it by writing code that produces the exact same
              result.
            </Text>
            <Text className="text-white font-exoBold xs:text-sm">
              ⚙️ Run and refine your code until your output matches perfectly!
            </Text>

            <Text className="text-white font-exoBold xs:text-sm mt-2">
              💻 If there’s a problem description instead:
            </Text>
            <Text className="text-white font-exoBold xs:text-sm">
              🧱 Write a solution that meets the given requirements.
            </Text>
            <Text className="text-white font-exoBold xs:text-sm">
              🚀 Execute your code and make sure it behaves as expected!
            </Text>

            <Text className="text-white font-exoBold xs:text-sm mt-2">
              Whether you’re recreating outputs or solving problems, CodeCrafter
              is where you turn logic into creation.
            </Text>
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
