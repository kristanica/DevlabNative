import React from "react";
import { Animated, Modal, Pressable, StyleSheet, Text } from "react-native";
import { Accordion } from "../global/Accordion";
type PlaygroundEvaluateModalProps = ScaleModalPayload & {
  evaluationRes: any;
};
const PlaygroundDatabaseEvaluationModal = ({
  visibility,
  scaleStyle,
  closeModal,
  evaluationRes,
}: PlaygroundEvaluateModalProps) => {
  return (
    <Modal visible={visibility} animationType="none" transparent={true}>
      <Pressable onPress={closeModal} className="flex-1 bg-black/50">
        <Pressable onPress={(e) => e.stopPropagation()} className="m-auto">
          <Animated.View
            style={[scaleStyle]}
            className="rounded-[10px] mx-8 bg-modal px-2"
          >
            <Text className=" text-center text-2xl text-white font-exoBold mt-2">
              EVALUATION RESULT
            </Text>
            {evaluationRes &&
              Object.entries(evaluationRes).map(([key, value]: any) => (
                <Accordion header={key} contents={value!} key={key} />
              ))}
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default PlaygroundDatabaseEvaluationModal;

const styles = StyleSheet.create({});
