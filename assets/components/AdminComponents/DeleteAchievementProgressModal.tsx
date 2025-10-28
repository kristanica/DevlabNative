import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";

const DeleteAchievementProgressModal = ({
  scaleStyle,
  closeModal,
  onConfirm,
}: ScaleModalPayload) => {
  return (
    <Animated.View
      style={scaleStyle}
      className="absolute inset-0 justify-center items-center w-full h-full bg-black/30 z-50"
    >
      <View className="  bg-modal w-[90%] border-[#2a3141] border-[1px] py-6 rounded-xl">
        <Text className="text-white  text-center px-7 py-2  font-exoBold text-sm xs:text-[12px] mb-5">
          Are you sure you want to delete this?
        </Text>
        <View className="flex-row justify-between px-5">
          <TouchableOpacity
            className="self-start bg-green-400 rounded-xl"
            onPress={() => {
              onConfirm!();
              closeModal();
            }}
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

export default DeleteAchievementProgressModal;

const styles = StyleSheet.create({});
