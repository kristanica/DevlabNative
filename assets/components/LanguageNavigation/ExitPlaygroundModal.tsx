import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// WIll show if user exits playground
import Animated from "react-native-reanimated";
const ExitPlaygroundModal = ({
  scaleStyle,
  onConfirm,
  closeModal,
}: ScaleModalPayload) => {
  return (
    <Animated.View
      style={scaleStyle}
      className="absolute inset-0 justify-center items-center w-full h-full bg-black/50 z-50"
    >
      <View className="  bg-modal w-[90%] border-[#2a3141] border-[1px] py-6 rounded-xl">
        <View className="py-2">
          <Text className="text-white  text-center px-7  font-exoBold text-sm xs:text-[12px] ">
            Are you sure you want to leave?
          </Text>
          <Text className="text-white  text-center px-7   font-exoLight text-[10px] xs:text-[9px] mb-5 opacity-60">
            ❗Your code will not be saved❗
          </Text>
        </View>

        <View className="flex-row justify-between px-10">
          <TouchableOpacity
            className="self-start bg-green-400 rounded-xl"
            onPress={onConfirm}
          >
            <Text className="text-white  px-7 py-2  font-exoBold text-xs xs:text-[10px]">
              Confirm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="self-start bg-red-400 rounded-xl"
            onPress={closeModal}
          >
            <Text className="text-white  px-7 py-2  font-exoBold text-xs xs:text-[10px]">
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default ExitPlaygroundModal;

const styles = StyleSheet.create({});
