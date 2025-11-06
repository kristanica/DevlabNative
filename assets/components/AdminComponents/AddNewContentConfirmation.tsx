import React, { BaseSyntheticEvent } from "react";
import {
  Animated,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AddNewContentConfirmation = ({
  visibility,
  scaleStyle,
  closeModal,
  onConfirm,
}: ScaleModalPayload) => {
  return (
    <Modal visible={visibility} transparent={true}>
      <View className="flex-[1] justify-center items-center bg-black/50">
        <Pressable
          className="w-[80%] h-[30%]"
          onPress={(e: BaseSyntheticEvent) => {
            Keyboard.dismiss();
            e.stopPropagation();
          }}
        >
          <Animated.View
            className="  bg-modal    border-[#2a3141] border-[1px] rounded-xl"
            style={[scaleStyle]}
          >
            <View className="py-2">
              <Text className="text-white  text-center px-7  font-exoBold text-sm xs:text-[12px] ">
                Are you sure you want to add a new content?
              </Text>
            </View>

            <View className="flex-row justify-evenly items-center mb-3 mt-3">
              <TouchableOpacity onPress={onConfirm}>
                <Text className="px-7 py-2 self-start bg-green-400 text-white text-xs xs:text-[10px]  rounded-2xl font-exoBold">
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal}>
                <Text className="px-7 py-2 self-start bg-red-400 text-white text-xs xs:text-[10px]  rounded-2xl font-exoBold">
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Pressable>
      </View>
    </Modal>
  );
};

export default AddNewContentConfirmation;

const styles = StyleSheet.create({});
