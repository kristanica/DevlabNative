import React, { ReactNode } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type buttonProps = {
  children: ReactNode;
  backgroundColor?: string;
  onPressAction?: (comp?: any) => void;
};

const ButtonAnimated = ({
  children,
  backgroundColor,
  onPressAction,
}: buttonProps) => {
  const scale = useSharedValue(1);

  const AnimatedView = Animated.createAnimatedComponent(View);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const scaleIn = () => {
    scale.value = withSpring(0.95, { stiffness: 100 });
  };
  const scaleOut = () => {
    scale.value = withSpring(1, { stiffness: 200 });
  };

  return (
    <TouchableOpacity
      onPressIn={scaleIn}
      onPressOut={scaleOut}
      onPress={onPressAction}
    >
      <AnimatedView
        style={[{ backgroundColor }, animatedStyle]}
        className="my-2  justify-center items-center rounded-3xl"
      >
        {children}
      </AnimatedView>
    </TouchableOpacity>
  );
};

export default ButtonAnimated;
