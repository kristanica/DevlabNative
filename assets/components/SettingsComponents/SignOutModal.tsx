import { ScaleModalProps } from "@/assets/constants/type";
import LottieView from "lottie-react-native";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const SignOutModal = ({
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
          className="   aspect-square w-3/4 m-auto  rounded-[10px]"
        >
          <View className="justify-center items-center flex-[1] bg-background rounded-3xl">
            <LottieView
              source={require("@/assets/Lottie/Sad Signout.json")}
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
              <Text className="text-white text-center font-exoBold xs:text-xs">
                Are you sure you want to sign out?
              </Text>
            </View>
            <View className="flex-[1] w-full flex-row  p-2 justify-evenly items-center">
              <Pressable onPress={onConfirm}>
                <Text className="text-white py-2 px-7 font-exoBold self-start xs:text-[8px] bg-[#7F5AF0] rounded-2xl">
                  Continue
                </Text>
              </Pressable>
              <Pressable onPress={closeModal}>
                <Text className="text-white py-2 px-7 font-exoBold self-start xs:text-[8px]  bg-[#FF6166] rounded-2xl">
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

export default SignOutModal;

const styles = StyleSheet.create({});
