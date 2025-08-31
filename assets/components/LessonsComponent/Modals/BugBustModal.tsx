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
    <Modal visible={visibility} animationType="none" transparent={true}>
      <Pressable onPress={closeModal} className="flex-1">
        <Animated.View
          style={[scaleStyle]}
          className="aspect-square w-3/4 m-auto rounded-[10px]"
        >
          <View className="  flex-[1] bg-background justify-center  rounded-3xl p-4">
            <Text className="text-white font-exoBold xs:text-sm text-justify">
              Welcome to BugBust — a fast-paced challenge where you’ll write and
              run code before time runs out!
            </Text>
            <Text className="text-white font-exoBold xs:text-sm ">
              Your mission:
            </Text>
            <Text className="text-white font-exoBold xs:text-sm ">
              🧩 Read the task
            </Text>
            <Text className="text-white font-exoBold xs:text-sm ">
              💻 Write your code
            </Text>
            <Text className="text-white font-exoBold xs:text-sm ">
              💻 🚀 Run it before the timer hits zero!
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
