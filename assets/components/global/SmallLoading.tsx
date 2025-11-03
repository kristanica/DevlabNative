import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
type SmallLoadingProps = {
  text?: string;
};
const SmallLoading = ({ text }: SmallLoadingProps) => {
  const opacityVal = useSharedValue<number>(0.5);

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacityVal.value,
  }));
  // Pulse effect
  useEffect(() => {
    opacityVal.value = withRepeat(withTiming(1, { duration: 800 }), -1, true);
  }, []);

  return (
    <Animated.View
      entering={FadeIn.duration(1000)}
      className="justify-center items-center z-50"
    >
      <LottieView
        source={require("@/assets/Lottie/loadingSmall.json")}
        style={{ width: "10%", aspectRatio: 1 }}
        autoPlay
      />

      <Animated.Text
        style={opacityStyle}
        className="text-white  text-lg xs:text-[10px] font-exoBold"
      >
        {text || "Please wait"}
      </Animated.Text>
    </Animated.View>
  );
};

export default React.memo(SmallLoading);

const styles = StyleSheet.create({});
