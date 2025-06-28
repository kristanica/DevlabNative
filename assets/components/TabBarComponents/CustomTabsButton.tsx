import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type customTabsButton = {
  onPress: () => void;
  onLongPress: () => void;
  name: string;
  isFocused: boolean;
  icon: "home" | "cart" | "settings" | "book" | "trophy";
};

const CustomTabsButton = ({
  onPress,
  onLongPress,
  icon,
  isFocused,
  name,
}: customTabsButton) => {
  const AnimatedIcons = Animated.createAnimatedComponent(Ionicons);

  const scaleVal = useSharedValue(1);

  const opacityVal = useSharedValue(1);

  const onHide = useAnimatedStyle(() => ({
    opacity: opacityVal.value,
  }));
  const onScale = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(scaleVal.value, [0, 1], [0, 1]),
      },
    ],

    marginTop: interpolate(scaleVal.value, [0, 1], [0, 7]),
  }));

  useEffect(() => {
    scaleVal.value = withSpring(isFocused ? 1.5 : 1);
    opacityVal.value = withSpring(isFocused ? 0 : 1, { duration: 500 });
  }, [isFocused]);

  return (
    <Pressable
      style={{}}
      onPress={() => onPress()}
      onLongPress={() => onLongPress()}
      className="flex-col justify-center items-center "
    >
      <View className="w-[20px] h-[30px] ">
        <AnimatedIcons
          name={isFocused ? icon : `${icon}-outline`}
          color={"white"}
          size={20}
          style={onScale}
        />
      </View>

      <Animated.Text className="text-white text-xs" style={onHide}>
        {name}
      </Animated.Text>
    </Pressable>
  );
};

export default CustomTabsButton;
