import toastHandler from "@/assets/zustand/toastHandler";
import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const CustomToast = () => {
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);
  const isToastVisible = toastHandler((state) => state.isToastVisible);
  const toastMessage = toastHandler((state) => state.toastMessage);
  const toastType = toastHandler((state) => state.toastType);
  const hideToast = toastHandler((state) => state.hideToast);
  const lastBgColor = React.useRef("");

  // fallback default
  const toastColors: Record<string, string> = {
    error: "red",
    success: "green",
    emptyCredentialField: "red",
    unverifiedEmail: "red",
    correctAnswer: "#4CAF50",
    wrongAnswer: "#FF3B30",
    stageUnlocked: "#2196F3",
    levelUnlocked: "#1E88E5",
    lessonUnlocked: "#1976D2",
    wholeTopicFinished: "#673AB7",
    loseOneHp: "#FFC107",
    reset: "#009688",
    noAnswer: "#FF5722",
  };

  lastBgColor.current = toastColors[toastType!] || lastBgColor.current;
  const animatedToastStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    if (isToastVisible) {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withTiming(0, { duration: 300 });

      setTimeout(() => {
        opacity.value = withTiming(0, { duration: 300 });
        translateY.value = withTiming(-100, { duration: 300 });
        hideToast();
      }, 2000);
    } else {
      opacity.value = withTiming(0, { duration: 300 });
      translateY.value = withTiming(-40, { duration: 300 });
    }
  }, [isToastVisible]);

  if (!isToastVisible && opacity.value === 0) return null;

  return (
    <Animated.View
      style={[
        animatedToastStyle,
        {
          backgroundColor: lastBgColor.current,
          top: 60,
          zIndex: 9999,
          left: "25%",
        },
      ]}
      className="h-[50px] w-52 mx-2 z-50  absolute left-50 border-[#ffffffaf] border-[2px] rounded-sm justify-center items-center "
    >
      <Text className="text-white text-xs font-exoExtraBold">
        {toastMessage}
      </Text>
    </Animated.View>
  );
};

export default CustomToast;

const styles = StyleSheet.create({});
