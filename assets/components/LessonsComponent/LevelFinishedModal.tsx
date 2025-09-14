import { ScaleModalProps } from "@/assets/constants/type";
import { activeBuffsLocal } from "@/assets/Hooks/function/activeBuffsLocal";
import { coinSurge } from "@/assets/Hooks/mainGameModeFunctions/globalItems/coinSurge";
import { setCoinsandExp } from "@/assets/zustand/setCoinsandExp";
import { userHealthPoints } from "@/assets/zustand/userHealthPoints";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const LevelFinishedModal = ({
  closeModal,
  visibility,
  scaleStyle,
  onConfirm,
}: ScaleModalProps) => {
  const expAndCoins = setCoinsandExp((state) => state.coinsAndExp);
  const userHealth = userHealthPoints((state) => state.health);
  const { coinSurgeItem } = coinSurge();
  const activeBuffs = activeBuffsLocal((state) => state.activeBuff);
  const removeActiveBuffs = activeBuffsLocal((state) => state.removeActiveBuff);

  useEffect(() => {
    if (!activeBuffs.includes("doubleCoins")) return;
    coinSurgeItem();

    removeActiveBuffs("doubleCoins");
  }, [activeBuffs]);

  return (
    <Modal visible={visibility} animationType="none" transparent={true}>
      <Pressable className="flex-1 bg-black/50">
        <LottieView
          source={require("@/assets/Lottie/Confetti.json")}
          loop={false}
          autoPlay
          style={[StyleSheet.absoluteFillObject]}
        />
        <Animated.View
          style={[scaleStyle]}
          className="  h-[50%] w-3/4 m-auto  rounded-[10px]"
        >
          <View className="justify-center items-center flex-[1] bg-modal rounded-xl border-[##6c37a5] border-[1px]">
            <Text className="text-[#f5ff42] font-exoExtraBold text-3xl my-5">
              LEVEL COMPLETED
            </Text>
            <View className="flex-[1] justify-center items-center bg-[#080c15] py-5 border-[#2a3141] border-[1px] rounded-2xl mx-5 px-5">
              <Text className="text-white text-center font-exoBold xs:text-xs">
                🌑 The Terminal Falls Silent You’ve emerged from the
                code—scarred, but wiser. The system yields, for now, recognizing
                your resolve. Yet beneath the surface, deeper logic churns…
                ancient, unrefined, waiting. 🕳️ This is not the end. Only the
                next beginning.
              </Text>
            </View>

            <View className="flex-[1] justify-center  items-center mt-2 border-[#2a3141] border-0 border-t-[1px]">
              <Text className="text-white text-center font-exoBold xs:text-xl">
                PERFORMANCE SUMMARY
              </Text>
              <View className="mt-3">
                <Text className="text-white text-center font-exoBold xs:text-xs">
                  Lives Remaining:
                  <Text className="text-[#ad3532]"> {userHealth}x</Text>
                </Text>
                <Text className="text-white text-center font-exoBold xs:text-xs">
                  DevCoins: +
                  <Text className="text-[#e3be00]">{expAndCoins?.coins}</Text>
                </Text>
                <Text className="text-white text-center font-exoBold xs:text-xs">
                  Experience gained: +
                  <Text className="text-[#21b3cf]">{expAndCoins?.exp}</Text>
                </Text>
              </View>
            </View>
            <View className="flex-[1] w-full flex-row  p-2 justify-evenly items-center">
              <Pressable onPress={onConfirm}>
                <Text className="text-white py-2 px-7 font-exoBold self-start xs:text-[8px] bg-[#7F5AF0] rounded-2xl">
                  Back to Main
                </Text>
              </Pressable>

              <Pressable onPress={closeModal}>
                <Text className="text-white py-2 px-7 font-exoBold self-start xs:text-[8px] bg-[#7F5AF0] rounded-2xl">
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

export default LevelFinishedModal;

const styles = StyleSheet.create({});
