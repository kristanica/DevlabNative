import React, { ReactNode } from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
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

type SwipeLessonContainerProps = {
  children: ReactNode;
};
const SwipeLessonContainer = ({ children }: SwipeLessonContainerProps) => {
  const { height } = Dimensions.get("screen");

  const heightVal = useSharedValue(height / 2);
  const state = useSharedValue<"up" | "down">("up");

  const swipeDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      if (state.value === "up") {
        heightVal.value = withSpring(50, { damping: 50, stiffness: 50 });
        state.value = "down";
      }
    });

  const swipeUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      if (state.value === "down") {
        heightVal.value = withSpring(height / 2, {
          damping: 50,
          stiffness: 50,
        });
        state.value = "up";
      }
    });
  const swipeStyle = useAnimatedStyle(() => ({
    height: heightVal.value,
  }));

  return (
    <GestureDetector gesture={Gesture.Exclusive(swipeDown, swipeUp)}>
      <Animated.View
        style={[swipeStyle]}
        className="w-full bg-background px-2 absolute bottom-0 border-[2px]  border-[#1c474d] border-b-0 pt-[20px] rounded-tl-[10px] rounded-tr-[10px]"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {children}
        </ScrollView>
      </Animated.View>
    </GestureDetector>
  );
};

export default SwipeLessonContainer;

const styles = StyleSheet.create({});
