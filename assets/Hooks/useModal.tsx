import { useEffect, useState } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const useModal = () => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const scaleVal = useSharedValue<number>(0);
  const opacityVal = useSharedValue<number>(0);

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleVal.value }],
    opacity: opacityVal.value,
  }));

  useEffect(() => {
    if (visibility) {
      scaleVal.value = withSpring(1, { damping: 100 });
      opacityVal.value = withTiming(1, { duration: 100 });
    } else {
      scaleVal.value = withSpring(0);
      opacityVal.value = withTiming(0, { duration: 100 });
    }
  }, [visibility]);

  const closeModal = () => {
    opacityVal.value = withTiming(0, { duration: 200 });
    scaleVal.value = withSpring(0);

    setTimeout(() => {
      setVisibility(false);
    }, 200);
  };

  return { visibility, setVisibility, scaleStyle, closeModal };
};

export default useModal;
