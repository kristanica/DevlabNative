import React, { ReactNode, useEffect } from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type AnimatedAppearContainerProps = {
  children: ReactNode;
  opacityVal: SharedValue<number>;
};

const AnimatedAppearContainer = ({
  children,
  opacityVal,
}: AnimatedAppearContainerProps) => {
  const opacStyle = useAnimatedStyle(() => ({
    opacity: opacityVal.value,
  }));

  useEffect(() => {
    opacityVal.value = withTiming(1, { duration: 500 });
  }, []);
  return <Animated.View style={opacStyle}>{children}</Animated.View>;
};

export default AnimatedAppearContainer;
