import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, Text } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

type SmallLoadingProps = {
  text?: string;
};
const SmallLoading = ({ text }: SmallLoadingProps) => {
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

      <Text className="text-white  text-lg xs:text-[10px] font-exoBold">
        {text || "Please wait"}
      </Text>
    </Animated.View>
  );
};

export default React.memo(SmallLoading);

const styles = StyleSheet.create({});
