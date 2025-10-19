import { ScaleModalProps } from "@/assets/constants/type";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const BrainBytesModal = ({
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
              Welcome to BrainBytes — a quiz mode where you’ll test your
              programming knowledge through fun multiple-choice questions!
            </Text>
            <Text className="text-white font-exoBold xs:text-sm">
              Your mission:
            </Text>
            <Text className="text-white font-exoBold xs:text-sm">
              🧩 Read each question carefully
            </Text>
            <Text className="text-white font-exoBold xs:text-sm">
              💡 Choose the correct answer
            </Text>
            <Text className="text-white font-exoBold text-xl">
              🚀 Learn and sharpen your coding logic one byte at a time!
            </Text>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default React.memo(BrainBytesModal);

const styles = StyleSheet.create({});
