import LottieView from "lottie-react-native";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";

const LockLessonModal = ({
  visibility,
  scaleStyle,
  closeModal,
  onConfirm,
}: ScaleModalPayload) => {
  return (
    <Modal visible={visibility} animationType="none" transparent={true}>
      <Pressable className="flex-1 bg-black/50" onPress={() => closeModal()}>
        <Animated.View
          className="   w-[250px] h-[300px] m-auto bg-modal rounded-[10px] border-[#2a3141] border-[1px]"
          style={scaleStyle}
        >
          <LottieView
            source={require("@/assets/Lottie/lockItem.json")}
            loop
            autoPlay
            style={{
              width: "50%",
              height: "40%",
              aspectRatio: 1,
              margin: "auto",
              marginTop: 20,
            }}
          />

          <View className="h-[50%] items-center justify-center">
            <Text className="text-white text-center font-exoBold text-md xs:text-[13px]">
              This content is currently locked.
            </Text>
            <Text className="text-white text-center font-exoLight text-md xs:text-[8px] opacity-50">
              Play through to progress
            </Text>

            <TouchableOpacity onPress={closeModal}>
              <Text className="text-white py-2 rounded-xl px-10 font-exoBold text-xs xs:text-[10px] bg-button self-start mx-auto mt-5">
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default LockLessonModal;

const styles = StyleSheet.create({});
