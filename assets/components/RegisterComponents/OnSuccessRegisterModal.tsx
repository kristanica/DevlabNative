import { fontFamily } from "@/fontFamily/fontFamily";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { Modal, Pressable, Text, View, ViewStyle } from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";
import ButtonAnimated from "../ButtonComponent";

type OnSuccessRegisterProps = {
  visibility: boolean;
  scaleStyle: AnimatedStyle<ViewStyle>;
  closeModal: () => void;
};

const OnSuccessRegister = ({
  visibility,
  scaleStyle,
  closeModal,
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
              source={require("@/assets/Lottie/sucessRegister.json")}
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
              <Text
                className="text-white text-center"
                style={{ fontFamily: fontFamily.ExoBold }}
              >
                Sucessfully created an account!
              </Text>
            </View>
            <View className="flex-[1] w-full flex-row  p-2 justify-evenly items-center">
              <ButtonAnimated
                height={30}
                width={100}
                backgroundColor={"#7F5AF0"}
                onPressAction={() => router.replace("/Login")}
              >
                <Text
                  className="text-white"
                  style={{ fontFamily: fontFamily.ExoBold }}
                >
                  Login
                </Text>
              </ButtonAnimated>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};
export default OnSuccessRegister;
