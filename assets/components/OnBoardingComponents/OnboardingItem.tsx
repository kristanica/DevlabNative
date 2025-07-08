import { height, width } from "@/assets/constants/constants";
import LottieView from "lottie-react-native";
import React from "react";
import { Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type OnboardingItemProps = {
  xVal: SharedValue<number>;
  item: {
    id: number;
    lottie: string;
    title: string;
    subtitle: string;
    description: string;

    background: string;
  };

  index: number;
};

const OnboardingItem = ({ xVal, item, index }: OnboardingItemProps) => {
  const interpolateBackground = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          xVal.value,
          [(index - 1) * width, index * width, (index + 1) * width],
          [1, 6, 6, 6],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  return (
    <View className="items-center" key={item.id} style={{ width, height }}>
      <Animated.View
        className="h-80 w-80 bg-red-200 rounded-full absolute z-0 overflow-hidden"
        style={[
          { top: 500, backgroundColor: item.background },
          interpolateBackground,
        ]}
      ></Animated.View>
      <LottieView
        source={item.lottie}
        style={{ width: width / 2, height: "50%" }}
        autoPlay
        loop
      />
      <Text className="text-white text-4xl font-exoExtraBold">
        {item.title}
      </Text>
      <Text className="text-white text-xl my-3 font-exoSemiBold">
        {item.subtitle}
      </Text>
      <Text className="text-white text-sm text-center mx-5 font-exoMedium">
        {item.description}
      </Text>
    </View>
  );
};

export default OnboardingItem;
