import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { Modal, Pressable, Text, View, ViewStyle } from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";

type OnSuccessRegisterProps = {
  visibility: boolean;
  scaleStyle: AnimatedStyle<ViewStyle>;
  closeModal: () => void;
  isSuccess: boolean;
};

const OnSuccessRegister = ({
  visibility,
  scaleStyle,
  closeModal,
  isSuccess,
}: OnSuccessRegisterProps) => {
  return (
    <Modal visible={visibility} animationType="none" transparent={true}>
      <Pressable onPress={closeModal} className="flex-1">
        <Animated.View
          className="   w-[250px] h-[300px] m-auto rounded-[10px]"
          style={[scaleStyle]}
        >
          <View className="justify-center items-center flex-[1] bg-[#2C2C2E] rounded-3xl">
            <LottieView
              source={
                isSuccess
                  ? require("@/assets/Lottie/sucessRegister.json")
                  : require("@/assets/Lottie/Sad Signout.json")
              }
              loop={false}
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
                {isSuccess
                  ? "Successfully created an account!"
                  : "Something went wrong when creating your account"}
              </Text>
            </View>
            <View className="flex-[1] w-full flex-row  p-2 justify-evenly items-center">
              {isSuccess ? (
                <Pressable onPress={() => router.replace("/Login")}>
                  <Text className="text-white font-exoBold px-7 py-2 rounded-2xl bg-[#2ECC71]">
                    Login
                  </Text>
                </Pressable>
              ) : (
                <Pressable onPress={() => closeModal()}>
                  <Text className="bg-[#E63946] text-white font-exoBold px-7 py-2 rounded-2xl ">
                    Close
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};
export default OnSuccessRegister;
