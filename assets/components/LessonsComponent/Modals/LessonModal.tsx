import { ScaleModalProps } from "@/assets/constants/type";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const LessonModal = ({
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
              Welcome to <Text className="text-[#7F5AF0]">Lesson Mode</Text> —
              where your coding journey begins!
            </Text>

            <View className="w-full space-y-2 mt-2">
              <Text className="text-white/90 font-exoBold text-xs xs:text-[10px] text-center">
                📘 Learn essential programming concepts step by step
              </Text>
              <Text className="text-white/90 font-exoBold text-xs xs:text-[10px] text-center">
                💡 Read, explore, and practice through interactive examples
              </Text>
              <Text className="text-white/90 font-exoBold text-xs xs:text-[10px] text-center">
                🧠 Master each topic to unlock the next stage of your DevLab
                adventure!
              </Text>
              <Text className="text-white font-exoBold text-xs xs:text-[10px] text-center mt-2">
                Every line you learn here powers up your skills for the
                challenges ahead.
              </Text>
            </View>

            <View className="w-full flex-row justify-center mt-6">
              <Pressable
                onPress={onConfirm}
                className="bg-[#7F5AF0] px-7 py-2 rounded-2xl active:scale-95 transition-all"
              >
                <Text className="text-white font-exoBold text-sm">
                  Continue
                </Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default React.memo(LessonModal);

const styles = StyleSheet.create({});
