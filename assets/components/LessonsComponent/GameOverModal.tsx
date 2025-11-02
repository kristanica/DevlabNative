import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";

type GameOverModalProps = ScaleModalPayload & {
  category: string;
};

const GameOverModal = ({
  visibility,
  scaleStyle,
  onConfirm,
  category,
  closeModal,
}: GameOverModalProps) => {
  return (
    <Modal visible={visibility} animationType="none" transparent={true}>
      <View className="flex-1 bg-black/60">
        <Animated.View
          style={[scaleStyle]}
          className="w-3/4  bg-white rounded-2xl border border-[#2a3141] p-5 z-50 m-auto "
        >
          <Text className=" text-3xl text-center font-exoBold text-[#ea3333]">
            GAME OVER
          </Text>
          <LottieView
            source={require("@/assets/Lottie/Sad Signout.json")}
            loop
            autoPlay
            style={{ width: "40%", aspectRatio: 1, marginHorizontal: "auto" }}
          />

          <Text className=" font-exoBold text-sm text-center">
            System Crash: No remaining lives detected in memory. Restart
            required to allocate new hearts.
          </Text>

          <View className="gap-2 mt-3">
            <TouchableOpacity onPress={onConfirm}>
              <Text className="bg-button font-exoRegular text-white px-2 py-2 text-xs xs:text-[12px] text-center rounded-xl">
                Go back to first stage
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/home/category/[categoryId]",
                  params: { categoryId: category },
                });
                closeModal();
              }}
            >
              <Text className="bg-button text-white font-exoRegular px-2 py-2 text-xs xs:text-[12px] text-center rounded-xl">
                Back to main
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default GameOverModal;

const styles = StyleSheet.create({});
