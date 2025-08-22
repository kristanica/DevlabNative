import { ScaleModalProps } from "@/assets/constants/type";
import LottieView from "lottie-react-native";
import React, { BaseSyntheticEvent } from "react";
import {
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";

const DeleteFireBaseConfirmationModal = ({
  visibility,
  scaleStyle,
  closeModal,
  onConfirm,
}: ScaleModalProps) => {
  return (
    <Modal visible={visibility} transparent={true}>
      <Pressable
        className="flex-[1] justify-center items-center "
        onPress={closeModal}
      >
        <Pressable
          className="w-[70%] h-[30%]"
          onPress={(e: BaseSyntheticEvent) => {
            Keyboard.dismiss();
            e.stopPropagation();
          }}
        >
          <Animated.View
            className="  bg-accent  border-[2px] h-full border-[#56EBFF] "
            style={[scaleStyle]}
          >
            <Text className="text-white font-exoBold mx-auto mt-3 ">
              Are you sure you want to delete this?
            </Text>

            <LottieView
              source={require("@/assets/Lottie/Sad Signout.json")}
              autoPlay
              loop
              style={{ flex: 1 }}
            ></LottieView>
            <View className="flex-row justify-evenly items-center mb-3">
              <TouchableOpacity onPress={onConfirm}>
                <Text className="px-7 py-2 self-start bg-green-400 text-white  rounded-2xl font-exoBold">
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal}>
                <Text className="px-7 py-2 self-start bg-red-400 text-white  rounded-2xl font-exoBold">
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default DeleteFireBaseConfirmationModal;

const styles = StyleSheet.create({});
