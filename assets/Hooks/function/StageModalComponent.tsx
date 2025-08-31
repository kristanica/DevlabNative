import BrainBytesModal from "@/assets/components/LessonsComponent/Modals/BrainBytesModal";
import BugBustModal from "@/assets/components/LessonsComponent/Modals/BugBustModal";
import CodeCrafterModal from "@/assets/components/LessonsComponent/Modals/CodeCrafterModal";
import CodeRushModal from "@/assets/components/LessonsComponent/Modals/CodeRushModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { JSX, useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import useModal from "../useModal";
type StageGameComponentProps = {
  type: string | undefined;
};
const StageModalComponent = ({ type }: StageGameComponentProps) => {
  const modal = useModal();
  useEffect(() => {
    const hasSeen = async () => {
      if (type !== "Lesson") {
        const hasBeenSeen = await AsyncStorage.getItem(`hasSeen${type}`);

        if (!hasBeenSeen) {
          modal.setVisibility(true);
          await AsyncStorage.setItem(`hasSeen${type}`, "true");
          return;
        }
      }
    };
    hasSeen();
  }, [type]);
  const handleConfirm = useCallback(() => modal.closeModal(), [modal]);
  const specificStageModal: Record<string, JSX.Element> = {
    BrainBytesModal: (
      <BrainBytesModal onConfirm={handleConfirm} {...modal}></BrainBytesModal>
    ),
    CodeCrafterModal: (
      <CodeCrafterModal onConfirm={handleConfirm} {...modal}></CodeCrafterModal>
    ),
    BugBustModal: (
      <BugBustModal onConfirm={handleConfirm} {...modal}></BugBustModal>
    ),
    CodeRushModal: (
      <CodeRushModal onConfirm={handleConfirm} {...modal}></CodeRushModal>
    ),
  };

  return specificStageModal[`${type}Modal`] ?? null;
};

export default StageModalComponent;

const styles = StyleSheet.create({});
