import React from "react";
import { Modal, Pressable, StyleSheet, ViewStyle } from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";

type EditStageModalProps = {
  visibility: boolean;
  scaleStyle: AnimatedStyle<ViewStyle>;
  closeModal: () => void;
};

const EditStageModal = ({
  visibility,
  scaleStyle,
  closeModal,
}: EditStageModalProps) => {
  return (
    <Modal visible={visibility} transparent={true}>
      <Pressable
        className="flex-[1] justify-center items-center"
        onPress={closeModal}
      >
        <Pressable className="w-[80%] h-[70%]" onPress={() => {}}>
          <Animated.View
            className="  bg-accent  border-[2px] h-full border-[#56EBFF]"
            style={[scaleStyle]}
          ></Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default EditStageModal;

const styles = StyleSheet.create({});
