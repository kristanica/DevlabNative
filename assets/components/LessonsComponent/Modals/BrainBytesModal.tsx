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
            <Text className="text-white font-exoBold text-center text-base mb-3">
              Welcome to <Text className="text-[#7F5AF0]">Brainbytes</Text> — a
              quiz mode where you’ll test your programming knowledge through fun
              multiple-choice questions!
            </Text>
            <View className="w-full space-y-2 mt-2">
              <Text className="text-white/90 font-exoBold text-xs xs:text-[10px] text-center">
                Your mission:
              </Text>
              <Text className="text-white/90 font-exoBold text-xs xs:text-[10px] text-center">
                🧩 Read each question carefully
              </Text>
              <Text className="text-white/90 font-exoBold text-xs xs:text-[10px] text-center">
                💡 Choose the correct answer
              </Text>
              <Text className="text-white/90 font-exoBold text-xs xs:text-[10px] text-center">
                🚀 Learn and sharpen your coding logic one byte at a time!
              </Text>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default React.memo(BrainBytesModal);

const styles = StyleSheet.create({});
