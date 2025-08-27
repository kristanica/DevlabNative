import { ScaleModalProps } from "@/assets/constants/type";
import useEditUserInfo from "@/assets/Hooks/query/useEditUserInfo";
import { useMutation } from "@tanstack/react-query";
import LottieView from "lottie-react-native";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";

type confirmationModalProps = {
  visibility: boolean;
  scaleStyle: AnimatedStyle<ViewStyle>;
  closeModal: () => void;
  userName: string;
  bio: string;
};

const ConfirmationModal = ({
  visibility,
  scaleStyle,
  closeModal,
  onConfirm,
}: ScaleModalProps) => {
  const mutation = useMutation({
    mutationFn: async ({ userName, bio }: { userName: string; bio: string }) =>
      await useEditUserInfo(userName, bio),
  });

  return (
    <Modal visible={visibility} animationType="none" transparent={true}>
      <Pressable onPress={closeModal} className="flex-1">
        <Animated.View
          style={[scaleStyle]}
          className="   w-[250px] h-[300px] m-auto bg-[#2C2C2E] rounded-[10px]"
        >
          <View className="justify-center items-center flex-[1] bg-[#2C2C2E] rounded-3xl">
            <LottieView
              source={require("@/assets/Lottie/Admin Login.json")}
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
              <Text className="text-white text-center font-exoBold">
                Do you want to save your changes?
              </Text>
            </View>
            <View className="flex-[1] w-full flex-row  p-2 justify-evenly items-center">
              <Pressable onPress={onConfirm}>
                <Text className="text-white py-2 px-7 font-exoBold bg-[#7F5AF0]">
                  Continue
                </Text>
              </Pressable>
              <Pressable onPress={closeModal}>
                <Text className="text-white py-2 px-10 font-exoBold bg-[#FF6166]">
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
