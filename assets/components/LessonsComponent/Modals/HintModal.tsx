import React from "react";
import { Modal, Pressable, StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";
type HintModalPayload = ScaleModalPayload & {
  hint: string | undefined;
};
const HintModal = ({
  visibility,
  scaleStyle,
  onConfirm,
  closeModal,
  hint,
}: HintModalPayload) => {
  return (
    <Modal visible={visibility} animationType="none" transparent={true}>
      <Pressable className="flex-1 bg-black/50">
        <Animated.View
          style={[scaleStyle]}
          className="    w-3/4 bg-modal m-auto  rounded-[10px] border-[#2a3141] border-[1px]"
        >
          <Text className="text-white my-5 text-center font-exoBold xs:text-xs">
            The code whisper to you
          </Text>
          <Text className="text-white text-center font-exoLight text-[11px]">
            {" "}
            {hint}
          </Text>

          <Pressable onPress={closeModal} className="mx-auto my-5">
            <Text className="text-white py-2 px-7 font-exoBold self-start xs:text-[8px] bg-[#7F5AF0] rounded-2xl">
              Continue
            </Text>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};
export default HintModal;

const styles = StyleSheet.create({});
