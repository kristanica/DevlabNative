import { fontFamily } from "@/fontFamily/fontFamily";
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
import ButtonAnimated from "../ButtonComponent";

type lockLessonModalProps = {
  visibility: boolean;
  scaleStyle: AnimatedStyle<ViewStyle>;
  closeModal: () => void;
};

const LockLessonModal = ({
  visibility,
  scaleStyle,
  closeModal,
}: lockLessonModalProps) => {
  return (
    <Modal visible={visibility} animationType="none" transparent={true}>
      <Pressable className="flex-1" onPress={() => closeModal()}>
        <Animated.View
          className="   w-[250px] h-[300px] m-auto bg-[#2C2C2E] rounded-[10px]"
          style={scaleStyle}
        >
          <LottieView
            source={require("@/assets/Lottie/lockItem.json")}
            loop
            autoPlay
            style={{
              height: 180,
            }}
          />

          <View className="flex-[1] justify-center items-center">
            <Text
              className="text-white text-center"
              style={{ fontFamily: fontFamily.ExoBold }}
            >
              This content is currently locked.
            </Text>
          </View>
          <View className="flex-[1] w-full flex-row  p-2 justify-evenly items-center">
            <ButtonAnimated
              backgroundColor={"#7F5AF0"}
              onPressAction={() => closeModal()}
            >
              <Text
                className="text-white py-2 px-10"
                style={{ fontFamily: fontFamily.ExoBold }}
              >
                Continue
              </Text>
            </ButtonAnimated>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default LockLessonModal;

const styles = StyleSheet.create({});
