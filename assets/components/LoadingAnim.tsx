import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, Text } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const LoadingAnim = () => {
  return (
    <Animated.View
      entering={FadeIn.duration(1000)}
      className="justify-center items-center"
    >
      <LottieView
        source={require("@/assets/Lottie/Loading.json")}
        style={{ height: 200, width: 200 }}
      />

      <Text className="text-white font-exoBold">Hang on tight</Text>
    </Animated.View>
  );
};

export default LoadingAnim;

const styles = StyleSheet.create({});
