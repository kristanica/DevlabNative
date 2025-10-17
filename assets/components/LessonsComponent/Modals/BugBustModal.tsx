import { ScaleModalProps } from "@/assets/constants/type";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const BugBustModal = ({
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
              Welcome to BugBust — a debugging challenge where your mission is
              to hunt down code errors and fix them!
            </Text>
            <Text className="text-white font-exoBold xs:text-sm">
              Your mission:
            </Text>
            <Text className="text-white font-exoBold xs:text-sm">
              🪲 Examine the buggy code carefully
            </Text>
            <Text className="text-white font-exoBold xs:text-sm">
              🧠 Spot the mistake
            </Text>
            <Text className="text-white font-exoBold xs:text-sm">
              💻 Apply the right fix and watch your code come to life!
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

export default React.memo(BugBustModal);

const styles = StyleSheet.create({});
