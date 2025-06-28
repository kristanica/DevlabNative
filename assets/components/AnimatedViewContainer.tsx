import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type AnimatedViewContainerProps = {
  children: React.ReactNode;
};

const AnimatedViewContainer = ({ children }: AnimatedViewContainerProps) => {
  const isFocused = useIsFocused();

  const opacVal = useSharedValue(0);
  const yVal = useSharedValue(20);

  const onEnterOpac = useAnimatedStyle(() => ({
    opacity: opacVal.value,
    transform: [{ translateY: yVal.value }],
  }));

  useEffect(() => {
    if (isFocused) {
      opacVal.value = withTiming(1, { duration: 200 });
      yVal.value = withTiming(0, { duration: 500 });
    } else {
      opacVal.value = withTiming(0, { duration: 200 });
      yVal.value = withTiming(20, { duration: 500 });
    }
  }, [isFocused]);

  return (
    <Animated.View className="flex-[1]" style={onEnterOpac}>
      {children}
    </Animated.View>
  );
};

export default AnimatedViewContainer;

const styles = StyleSheet.create({});
