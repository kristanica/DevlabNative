import React from "react";
import { StyleSheet, Text } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const DraggableCodeEditor = () => {
  const xVal = useSharedValue(0);
  const yVal = useSharedValue(0);
  const xStart = useSharedValue(0);
  const yStart = useSharedValue(0);
  const drag = Gesture.Pan()
    .onStart(() => {
      xStart.value = xVal.value;
      yStart.value = yVal.value;
    })
    .onUpdate((event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
      xVal.value = xStart.value + event.translationX;
      yVal.value = yStart.value + event.translationY;
    });

  const dragStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: xVal.value }, { translateY: yVal.value }],
  }));

  return (
    <GestureDetector gesture={drag}>
      <Animated.View
        className="h-[200px] w-[200px] bg-red-200 "
        style={dragStyle}
      >
        <Text>Hello</Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default DraggableCodeEditor;

const styles = StyleSheet.create({});
