import { ScaleModalProps } from "@/assets/constants/type";
import LottieView from "lottie-react-native";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";

type SaveToFirebaseResultModalProps = ScaleModalProps & {
  isFirebaseSuccess: boolean;
};

const SaveToFirebaseResultModal = ({
  scaleStyle,
  closeModal,

  isFirebaseSuccess,
}: SaveToFirebaseResultModalProps) => {
  return (
    <Animated.View
      style={scaleStyle}
      className="absolute inset-0 justify-center items-center"
    >
      <Pressable
        className="flex-1 justify-center items-center bg-red-200"
        onPress={closeModal} // Close when tapping outside
      >
        <Pressable
          className="h-[30%] w-[50%]"
          onPress={(e) => {
            e.stopPropagation();
            closeModal();
          }} // Prevent closing when tapping inside
        >
          <Animated.View className="flex-1 bg-accent rounded-2xl overflow-hidden">
            <LottieView
              source={
                isFirebaseSuccess
                  ? require("@/assets/Lottie/sucessRegister.json")
                  : require("@/assets/Lottie/failedRegister.json")
              }
              autoPlay
              loop={false}
              style={{ flex: 1 }}
            />

            <Text className="text-white text-lg font-exoBold text-center mb-5">
              {isFirebaseSuccess
                ? "Successfully edited"
                : "One of the fields is empty"}
            </Text>
          </Animated.View>
        </Pressable>
      </Pressable>
    </Animated.View>
  );
};

export default SaveToFirebaseResultModal;

const styles = StyleSheet.create({});
