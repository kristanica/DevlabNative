import { useEffect, useState } from "react";
import {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
const useModal = () => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const scaleVal = useSharedValue<number>(0.95);
  const opacityVal = useSharedValue<number>(0);

  const scaleStyle = useAnimatedStyle(() => ({
    // transform: [{ scale: scaleVal.value }],
    opacity: opacityVal.value,
  }));
  useEffect(() => {
    if (visibility) {
      // Fast, fluid timing optimized for smooth perceived motion
      opacityVal.value = withTiming(1, {
        duration: 180, // <200ms keeps everything tight and responsive
        easing: Easing.out(Easing.quad),
      });
      scaleVal.value = withTiming(1, {
        duration: 180,
        easing: Easing.out(Easing.quad),
      });
    } else {
      opacityVal.value = withTiming(0, {
        duration: 150,
        easing: Easing.in(Easing.quad),
      });
      scaleVal.value = withTiming(0.96, {
        duration: 150,
        easing: Easing.in(Easing.quad),
      });
    }
  }, [visibility]);
  const closeModal = () => {
    opacityVal.value = withTiming(0, { duration: 200 }, (finishied) => {
      if (finishied) {
        runOnJS(setVisibility)(false);
      }
    });
    // scaleVal.value = withSpring(0);
  };

  return { visibility, setVisibility, scaleStyle, closeModal };
};

export default useModal;
