import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

type useSequentialAppearAnimProps = {
  indicator: string | boolean;
  id: number;
};

const useSequentialAppearAnim = ({
  indicator,
  id,
}: useSequentialAppearAnimProps) => {
  const scaleVal = useSharedValue(0);

  const onScale = useAnimatedStyle(() => ({
    opacity: scaleVal.value,
    transform: [{ scale: scaleVal.value }],
  }));

  useEffect(() => {
    scaleVal.value = 0;
    scaleVal.value = withDelay(
      id * 100,
      withSpring(1, { damping: 15, stiffness: 80 })
    );
  }, [indicator]);

  return { onScale };
};

export default useSequentialAppearAnim;
