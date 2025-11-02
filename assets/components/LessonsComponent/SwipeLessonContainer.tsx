import Ionicons from "@expo/vector-icons/Ionicons";
import React, { ReactNode, useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type SwipeLessonContainerProps = {
  children: ReactNode;
  gameType: string;
  isShown: boolean; // controlled from parent
  onToggle?: () => void; // toggle callback from parent
};
const SwipeLessonContainer = ({
  children,
  gameType,
  isShown,
  onToggle,
}: SwipeLessonContainerProps) => {
  const { height } = Dimensions.get("screen");

  const heightVal = useSharedValue(height - 100);
  const opacityVal = useSharedValue(1);

  const swipeStyle = useAnimatedStyle(() => ({
    height: heightVal.value,
    opacity: opacityVal.value,
  }));
  useEffect(() => {
    heightVal.value = withSpring(isShown ? height - 100 : 0, {
      damping: 50,
      stiffness: 50,
    });
    setTimeout(() => {
      opacityVal.value = withSpring(isShown ? 1 : 0);
    }, 200);
  }, [isShown]);

  return (
    <Animated.View
      style={[swipeStyle]}
      className="w-full bg-background px-2 absolute bottom-0 border-[2px]  border-[#2a3141] border-[1px]border-b-0 pt-[20px] rounded-tl-[10px] rounded-tr-[10px]"
    >
      {gameType !== "BrainBytes" && (
        <TouchableOpacity
          onPress={onToggle}
          className="absolute  z-50"
          style={{
            top: 18,
            right: 60,
          }}
        >
          <Ionicons
            name={`${isShown ? `arrow-down-circle` : `arrow-up-circle`}`}
            color={"yellow"}
            size={25}
          ></Ionicons>
        </TouchableOpacity>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {children}
      </ScrollView>
    </Animated.View>
  );
};

export default React.memo(SwipeLessonContainer);

const styles = StyleSheet.create({});
