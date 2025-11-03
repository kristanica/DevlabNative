import LottieView from "lottie-react-native";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

// Will render when changing user information
const ConfirmationModal = ({
  visibility,
  scaleStyle,
  closeModal,
  onConfirm,
}: ScaleModalPayload) => {
  return (
    <Modal visible={visibility} animationType="none" transparent={true}>
      <Pressable onPress={closeModal} className="flex-1 bg-black/50">
        <Animated.View
          style={[scaleStyle]}
          className="   w-[250px] h-[300px] m-auto  rounded-[10px]"
        >
          <View className="justify-center items-center flex-[1] bg-modal rounded-xl border-[#2a3141] border-[1px]">
            <LottieView
              source={require("@/assets/Lottie/Loading.json")}
              loop
              autoPlay
              style={{
                height: 200,
                width: 200,
                flex: 3,
                marginTop: 10,
              }}
            />
            <View className="flex-[1] justify-center items-center">
              <Text className="text-white text-center font-exoBold text-xs xs:text-[9px]">
                Do you want to save your changes?
              </Text>
            </View>
            <View className="flex-[1] w-full flex-row  p-2 justify-evenly items-center">
              <Pressable onPress={onConfirm}>
                <Text className="text-white py-2 px-7 font-exoBold bg-[#7F5AF0] text-xs xs:text-[9px] rounded-xl">
                  Continue
                </Text>
              </Pressable>
              <Pressable onPress={closeModal}>
                <Text className="text-white py-2 px-10 font-exoBold bg-[#FF6166] text-xs xs:text-[9px] rounded-xl">
                  No
                </Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({});
