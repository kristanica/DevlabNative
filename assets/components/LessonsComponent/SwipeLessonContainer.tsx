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
  const swipeUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      heightVal.value = withSpring(height / 2, { damping: 50, stiffness: 50 });
    });

  const swipeDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      heightVal.value = withSpring(50);
    });

  const swipeStyle = useAnimatedStyle(() => ({
    height: heightVal.value,
  }));

  return (
    <GestureDetector gesture={Gesture.Simultaneous(swipeDown, swipeUp)}>
      <Animated.View
        style={[swipeStyle]}
        className="w-full bg-background px-2 absolute bottom-0 border-[2px]  border-[#56EBFF] border-b-0 pt-[20px] rounded-tl-[10px] rounded-tr-[10px]"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
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
