import React from "react";
import { Image, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

type customTabsButton = {
  onPress: () => void;
  onLongPress: () => void;
  name: string;
  isFocused: boolean;

  navIcon: any;
};

const CustomTabsButton = ({
  onPress,
  onLongPress,
  isFocused,
  name,
  navIcon,
}: customTabsButton) => {
  // const AnimatedIcons = Animated.createAnimatedComponent(Image);

  // const scaleVal = useSharedValue(1);

  // const onScale = useAnimatedStyle(() => ({
  //   transform: [
  //     {
  //       scale: interpolate(scaleVal.value, [0, 1], [0, 1]),
  //     },
  //   ],
  // }));

  // useEffect(() => {
  //   if (isFocused) {
  //     scaleVal.value = withSequence(
  //       withTiming(1.2, { duration: 100 }),
  //       withTiming(1, { duration: 100 })
  //     );
  //   }
  // }, [isFocused]);

  return (
    <TouchableOpacity
      style={{}}
      onPress={() => onPress()}
      onLongPress={() => onLongPress()}
      className="flex-col justify-center items-center "
    >
      <Image
        source={navIcon}
        className="h-[20px] w-[20px] m-auto mt-2 "
        // style={onScale}
      ></Image>

      <Animated.Text className="text-white xs:text-[8px] pt-2">
        {name}
      </Animated.Text>
    </TouchableOpacity>
  );
};

export default React.memo(CustomTabsButton);
