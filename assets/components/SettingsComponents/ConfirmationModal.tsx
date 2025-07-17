import useEditUserInfo from "@/assets/Hooks/query/useEditUserInfo";
import { useMutation } from "@tanstack/react-query";
import LottieView from "lottie-react-native";
import React from "react";
import {
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";
import ButtonAnimated from "../ButtonComponent";

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
  userName,
  bio,
}: confirmationModalProps) => {
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
              <ButtonAnimated
                backgroundColor={"#7F5AF0"}
                onPressAction={() => {
                  Keyboard.dismiss;
                  mutation.mutate({ userName, bio });
                  closeModal();
                }}
              >
                <Text className="text-white py-2 px-10 font-exoBold">
                  Continue
                </Text>
              </ButtonAnimated>
              <ButtonAnimated
                backgroundColor={"#FF6166"}
                onPressAction={closeModal}
              >
                <Text className="text-white py-2 px-10 font-exoBold">No</Text>
              </ButtonAnimated>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({});
