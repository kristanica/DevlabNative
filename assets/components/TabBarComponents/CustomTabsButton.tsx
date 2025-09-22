import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type customTabsButton = {
  onPress: () => void;
  onLongPress: () => void;
  name: string;
  isFocused: boolean;
  icon: any;
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

  const onScale = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(scaleVal.value, [0, 1], [0, 1]),
      },
    ],
  }));

  useEffect(() => {
    scaleVal.value = withSequence(
      withTiming(1.2, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    // scaleVal.value = withSpring(isFocused ? 1.5 : 1);
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

      <Animated.Text className="text-white xs:text-[8px]">{name}</Animated.Text>
    </Pressable>
  );
};

export default React.memo(CustomTabsButton);
