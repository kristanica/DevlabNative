import { ScaleModalProps } from "@/assets/constants/type";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const GameOverModal = ({
  visibility,
  scaleStyle,
  onConfirm,
}: ScaleModalProps) => {
  return (
    <Modal visible={visibility} animationType="none" transparent={true}>
      <Pressable className="flex-1">
        <Animated.View
          style={[scaleStyle]}
          className="   aspect-square w-3/4 m-auto  rounded-[10px]"
        >
          <View className="justify-center items-center flex-[1] bg-background rounded-3xl">
            <View className="flex-[1] justify-center items-center">
              <Text className="text-white text-center font-exoBold xs:text-xs">
                You've lost all your lives
              </Text>
            </View>
            <View className="flex-[1] w-full flex-row  p-2 justify-evenly items-center">
              <Pressable onPress={onConfirm}>
                <Text className="text-white py-2 px-7 font-exoBold self-start xs:text-[8px] bg-[#7F5AF0] rounded-2xl">
                  Return
                </Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default GameOverModal;

const styles = StyleSheet.create({});
