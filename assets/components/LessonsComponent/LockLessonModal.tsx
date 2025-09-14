import { ScaleModalProps } from "@/assets/constants/type";
import LottieView from "lottie-react-native";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import ButtonAnimated from "../ButtonComponent";

const LockLessonModal = ({
  visibility,
  scaleStyle,
  closeModal,
  onConfirm,
}: ScaleModalProps) => {
  return (
    <Modal visible={visibility} animationType="none" transparent={true}>
      <Pressable className="flex-1" onPress={() => closeModal()}>
        <Animated.View
          className="   w-[250px] h-[300px] m-auto bg-[#2C2C2E] rounded-[10px]"
          style={scaleStyle}
        >
          <LottieView
            source={require("@/assets/Lottie/lockItem.json")}
            loop
            autoPlay
            style={{
              height: 180,
            }}
          />

          <View className="flex-[1] justify-center items-center">
            <Text className="text-white text-center font-exoBold">
              This content is currently locked.
            </Text>
          </View>
          <View className="flex-[1] w-full flex-row  p-2 justify-evenly items-center">
            <ButtonAnimated
              backgroundColor={"#7F5AF0"}
              onPressAction={onConfirm}
            >
              <Text className="text-white py-2 px-10 font-exoBold">
                Continue
              </Text>
            </ButtonAnimated>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default LockLessonModal;

const styles = StyleSheet.create({});
