import React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const SwipeWebViewContainer = () => {
  const { height } = Dimensions.get("screen");
  const yVal = useSharedValue(-350);
  const swipeUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      yVal.value = withSpring(-350);
    });

  const swipeDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      yVal.value = withSpring(0);
    });

  const swipeStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: yVal.value,
      },
    ],
  }));
  return (
    <GestureDetector gesture={Gesture.Simultaneous(swipeDown, swipeUp)}>
      <Animated.View
        style={[swipeStyle, { height: height / 2 }]} // fixed height = 50% screen
        className="w-full bg-white absolute rounded-t-2xl shadow-lg justify-end z-10"
      >
        <Text className="text-black text-center">
          Swipe me for instructions!
        </Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default SwipeWebViewContainer;

const styles = StyleSheet.create({});
