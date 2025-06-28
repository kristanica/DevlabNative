import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type dotProps = {
  index: number;
  xVal: SharedValue<number>;
};

const PaginationDot = ({ index, xVal }: dotProps) => {
  const { width } = Dimensions.get("screen");
  const interpolateScale = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          xVal.value,
          [(index - 1) * width, index * width, (index + 1) * width],
          [1, 2, 1],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));
  return (
    <Animated.View
      style={interpolateScale}
      className="w-[10px] h-[10px] bg-black rounded-full flex-row"
    />
  );
};

export default PaginationDot;

const styles = StyleSheet.create({});
