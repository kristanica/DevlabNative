import { ViewStyle } from "react-native";
import { AnimatedStyle } from "react-native-reanimated";

export type ScaleModalProps = {
  visibility: boolean;
  scaleStyle: AnimatedStyle<ViewStyle>;
  closeModal: () => void;

  onConfirm: () => void;
};
