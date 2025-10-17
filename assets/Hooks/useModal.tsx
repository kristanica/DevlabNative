import { useEffect, useState } from "react";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
const useModal = () => {
  const [visibility, setVisibility] = useState<boolean>(false);
  // const scaleVal = useSharedValue<number>(0);
  const opacityVal = useSharedValue<number>(0);

  const scaleStyle = useAnimatedStyle(() => ({
    // transform: [{ scale: scaleVal.value }],
    opacity: opacityVal.value,
  }));

  useEffect(() => {
    if (visibility) {
      // scaleVal.value = withSpring(1, { damping: 100 });
      opacityVal.value = withTiming(1, { duration: 200 });
    } else {
      // scaleVal.value = withSpring(0);
      opacityVal.value = withTiming(0, { duration: 200 });
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
