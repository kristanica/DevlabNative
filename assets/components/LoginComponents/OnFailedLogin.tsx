import React, { ReactNode, useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type OnFailedLoginProps = {
  trigger: boolean;
  children: ReactNode;
};

const OnFailedLogin = ({ trigger, children }: OnFailedLoginProps) => {
  const borderVal = useSharedValue(0);
  const xVal = useSharedValue(0);

  const onIncorrect = useAnimatedStyle(() => ({
    borderColor: interpolateColor(borderVal.value, [0, 1], ["black", "red"]),
    transform: [{ translateX: xVal.value }],
    borderWidth: 3,
    borderRadius: 24,
  }));

  useEffect(() => {
    if (!trigger) return;
    borderVal.value = withRepeat(withTiming(1, { duration: 200 }), 2, true);
    xVal.value = withSequence(
      withTiming(10, { duration: 100 }),
      withTiming(-10, { duration: 100 }),
      withTiming(0, { duration: 100 })
    );
  }, [trigger]);

  return <Animated.View style={onIncorrect}>{children}</Animated.View>;
};

export default OnFailedLogin;

const styles = StyleSheet.create({});
